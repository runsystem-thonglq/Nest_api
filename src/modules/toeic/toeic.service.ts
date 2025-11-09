import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateToeicDto } from "./dto/create-toeic.dto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import { ToeicRepository } from "@repositories/toeic.repository";
import JSON5 from "json5";
@Injectable()
export class ToeicService {
  constructor(private readonly toeicRepository: ToeicRepository) {}

  async create(dto: CreateToeicDto, file: Express.Multer.File) {
    try {
      Logger.log(typeof file, 22);
      const b64 = file.buffer.toString("base64");

      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompts = ["part5.md", "part6.md", "part7.md"].map((f) =>
        fs.readFileSync(
          path.join(process.cwd(), "src", "AI", "promt", f),
          "utf-8"
        )
      );
      const parseJson = (text: string) => {
        const m = text.match(/```json[\s\S]*?```/i);
        const t = m ? m[0].replace(/```json|```/g, "").trim() : text;
        return JSON5.parse(t);
      };

      const [r5, r6, r7] = await Promise.all(
        prompts.map((p) =>
          model.generateContent([
            { inlineData: { data: b64, mimeType: "application/pdf" } },
            { text: p },
          ])
        )
      );

      const response5 = await r5.response;
      const text5 = response5.text();
      const raw5 = parseJson(text5);

      const response6 = await r6.response;
      const text6 = response6.text();
      const raw6 = parseJson(text6);

      const response7 = await r7.response;
      const text7 = response7.text();
      const raw7 = parseJson(text7);

      const parts = [...raw5, ...raw6, ...raw7];
      const saved = await this.toeicRepository.save({
        title: dto.title,
        timeLimit: dto.timeLimit || 45,
        parts,
      });
      return saved;
    } catch (error) {
      // Nếu bạn muốn có message cụ thể:
      throw new BadRequestException({
        message:
          "Không thể xử lý file PDF. Kiểm tra lại định dạng z" + error.message
            ? error.message
            : error,
        detail: error.message ? error.message : error,
      });
    }
  }
  async findAll() {
    return this.toeicRepository.findAllWithParts();
  }
}
