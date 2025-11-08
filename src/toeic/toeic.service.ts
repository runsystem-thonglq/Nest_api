import { Injectable } from "@nestjs/common";
import { CreateToeicDto } from "./dto/create-toeic.dto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import { ToeicRepository } from "@repositories/toeic.repository";

@Injectable()
export class ToeicService {
  constructor(private readonly toeicRepository: ToeicRepository) {}

  async create(dto: CreateToeicDto, file: File) {
    // Gọi AI parse PDF
    const arrayBuffer = await file.arrayBuffer();
    const b64 = Buffer.from(arrayBuffer).toString("base64");

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompts = ["part5.md", "part6.md", "part7.md"].map((f) =>
      fs.readFileSync(path.join(process.cwd(), "AI", "promt", f), "utf-8")
    );

    const [r5, r6, r7] = await Promise.all(
      prompts.map((p) =>
        model.generateContent([
          { inlineData: { data: b64, mimeType: "application/pdf" } },
          { text: p },
        ])
      )
    );

    const parseJson = (text: string) => {
      const m = text.match(/```json[\s\S]*?```/i);
      const t = m ? m[0].replace(/```json|```/g, "").trim() : text;
      return JSON.parse(t);
    };

    const raw5 = parseJson(r5.response.text());
    const raw6 = parseJson(r6.response.text());
    const raw7 = parseJson(r7.response.text());
    const parts = [...raw5, ...raw6, ...raw7];
    // host reload
    const saved = await this.toeicRepository.save({
      title: dto.title,
      timeLimit: dto.timeLimit || 45,
      parts,
    });
    // relo s z
    return saved;
  }

  async findAll() {
    //
    return this.toeicRepository.findAllWithParts();
  }
}
