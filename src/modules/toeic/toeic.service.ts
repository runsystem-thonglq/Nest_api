import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateToeicDto } from "./dto/create-toeic.dto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import { ToeicRepository } from "@repositories/toeic.repository";
import JSON5 from "json5";
import { ToeicGroupQuestion } from "@entities/toiec-group-question.entity";
import { ToeicPart } from "@entities/toeic-part.entity";
import { ToeicQuestion } from "@entities/toeic-question.entity";
import { ToeicGroupRepository } from "@repositories/toeic-group.repository";
import { ToeicPartRepository } from "@repositories/toeic-part.repository";
import { ToeicTest } from "@entities/toeic.entity";
@Injectable()
export class ToeicService {
  constructor(
    private readonly toeicRepository: ToeicRepository,
    private readonly toeicGroupRepository: ToeicGroupRepository,
    private readonly partRepository: ToeicPartRepository
  ) {}

  async create(dto: CreateToeicDto, file: Express.Multer.File) {
    try {
      const b64 = file.buffer.toString("base64");

      // ====== Khởi tạo AI (chưa sử dụng trong ví dụ) ======
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // ====== Load prompts ======
      const prompts = ["part5.md", "part6.md"].map((f) =>
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

      // Generate content via AI
      // const [r5, r6] = await Promise.all(
      //   prompts.map((p) =>
      //     model.generateContent([
      //       { inlineData: { data: b64, mimeType: "application/pdf" } },
      //       { text: p },
      //     ])
      //   )
      // );

      // const raw5 = parseJson(r5.response.candidates[0].content.parts[0].text);
      // const raw6 = parseJson(r6.response.candidates[0].content.parts[0].text);
      const raw5 = [
        {
          id: 101,
          part: 5,
          question:
            "Ms. Budrow was promoted after ------- group recorded the highest revenue growth for the year.",
          options: {
            A: "her",
            B: "hers",
            C: "herself",
            D: "she",
          },
          answer: "A",
          explanation: {
            vi: {
              option_analysis: {
                A: "Là tính từ sở hữu, đứng trước danh từ 'group' để chỉ 'nhóm của cô ấy'. Đây là lựa chọn đúng vì về mặt ngữ pháp, chúng ta cần một tính từ sở hữu để bổ nghĩa cho danh từ.",
                B: "Là đại từ sở hữu, dùng để thay thế cho một cụm danh từ sở hữu (ví dụ: 'the group is hers'). Không thể đứng trước danh từ 'group'.",
                C: "Là đại từ phản thân, dùng để nhấn mạnh chủ ngữ hoặc khi chủ ngữ và tân ngữ là một (ví dụ: 'She did it herself'). Không phù hợp trong ngữ cảnh này.",
                D: "Là đại từ nhân xưng chủ ngữ, dùng làm chủ ngữ của câu (ví dụ: 'She recorded...'). Không thể đứng trước danh từ 'group' để bổ nghĩa.",
              },
              correct_answer: "✅ Đáp án đúng: A. her",
              sentence_explanation:
                "Trong câu này, chúng ta cần một từ để bổ nghĩa cho danh từ 'group' (nhóm). 'Her' là tính từ sở hữu phù hợp để chỉ 'nhóm của cô ấy' (her group), làm cho câu có nghĩa là Bà Budrow đã được thăng chức sau khi nhóm của cô ấy ghi nhận mức tăng trưởng doanh thu cao nhất trong năm.",
              translation:
                "Bà Budrow đã được thăng chức sau khi nhóm của cô ấy ghi nhận mức tăng trưởng doanh thu cao nhất trong năm.",
              vocab_notes:
                "📘 Ghi nhớ:\n- `promoted` (v): thăng chức, đề bạt\n- `revenue growth` (n): tăng trưởng doanh thu\n- `group` (n): nhóm",
              grammar_notes:
                "👉 Cần một tính từ sở hữu (`possessive adjective`) đứng trước danh từ (`group`) để chỉ quyền sở hữu hoặc mối quan hệ.",
            },
            en: {
              summary:
                "The blank requires a possessive adjective to modify the noun 'group'. 'Her' (A) is the correct possessive adjective, indicating 'her group'. 'Hers' is a possessive pronoun, 'herself' is a reflexive pronoun, and 'she' is a subject pronoun, none of which can directly modify a noun in this context.",
            },
          },
        },
        {
          id: 102,
          part: 5,
          question:
            "The community program features classes in photography, drawing, ------- other arts.",
          options: {
            A: "yet",
            B: "but",
            C: "and",
            D: "thus",
          },
          answer: "C",
          explanation: {
            vi: {
              option_analysis: {
                A: "Là một liên từ dùng để diễn tả sự đối lập hoặc một trạng từ có nghĩa 'vẫn chưa'. Không phù hợp để liệt kê thêm.",
                B: "Là liên từ dùng để diễn tả sự đối lập. Không phù hợp để liệt kê thêm.",
                C: "Là liên từ dùng để nối các yếu tố tương đồng trong danh sách hoặc để thêm thông tin. 'Photography, drawing, and other arts' là một cách liệt kê tự nhiên.",
                D: "Là trạng từ có nghĩa 'do đó', 'vì vậy'. Dùng để chỉ kết quả, không phải để liệt kê.",
              },
              correct_answer: "✅ Đáp án đúng: C. and",
              sentence_explanation:
                "Trong câu này, chúng ta đang liệt kê các loại hình nghệ thuật khác nhau được giới thiệu trong chương trình cộng đồng. 'And' là liên từ phù hợp nhất để nối 'photography', 'drawing' với 'other arts', thể hiện sự bổ sung.",
              translation:
                "Chương trình cộng đồng có các lớp học về nhiếp ảnh, vẽ và các loại hình nghệ thuật khác.",
              vocab_notes:
                "📘 Ghi nhớ:\n- `community program` (n): chương trình cộng đồng\n- `features` (v): có tính năng, bao gồm\n- `photography` (n): nhiếp ảnh\n- `drawing` (n): vẽ",
              grammar_notes:
                "👉 Sử dụng liên từ `and` để nối các yếu tố tương đồng trong một danh sách.",
            },
            en: {
              summary:
                "The sentence lists various art forms offered in the program. 'And' (C) is the appropriate conjunction to connect items in a list, indicating addition. 'Yet' and 'but' imply contrast, and 'thus' indicates a result.",
            },
          },
        },
      ];

      const raw6 = [
        {
          part: 6,
          passage_id: 1,
          title: "Atzeret game (Product #DS8192) Memo",
          context:
            "To: All staff\nFrom: Leonard Villalobos, Vice President of Product Development\nDate: August 27\nSubject: Atzeret game (Product #DS8192)\n\nDue to the results from our trial customer testing, we have decided to postpone the launch of the\nAtzeret video game. Customer surveys indicated that the game was less **_**(131) than we\nanticipated. Over the next few months, the game development team will introduce several **_**(132)\nto make the product more attractive. **_**(133). If the changes are successful, we hope to launch the\ngame by next January **_**(134) February.",
          questions: [
            {
              id: 131,
              question:
                "Customer surveys indicated that the game was less **_**(131) than we anticipated.",
              options: {
                A: "expensive",
                B: "repetitive",
                C: "appealing",
                D: "surprising",
              },
              answer: "",
              explanation: {},
            },
            {
              id: 132,
              question:
                "Over the next few months, the game development team will introduce several **_**(132) to make the product more attractive.",
              options: {
                A: "modification",
                B: "modifies",
                C: "modifying",
                D: "modifications",
              },
              answer: "",
              explanation: {},
            },
            {
              id: 133,
              question:
                "**_**(133). If the changes are successful, we hope to launch the game by next January **_**(134) February.",
              options: {
                A: "At that point, more tests will be conducted.",
                B: "The launch will be our biggest of the year.",
                C: "However, the surveys are not reliable.",
                D: "Team members must each sign the form.",
              },
              answer: "",
              explanation: {},
            },
            {
              id: 134,
              question:
                "If the changes are successful, we hope to launch the game by next January **_**(134) February.",
              options: {
                A: "since",
                B: "or",
                C: "if",
                D: "later",
              },
              answer: "",
              explanation: {},
            },
          ],
        },
        {
          part: 6,
          passage_id: 2,
          title: "Technical query E-mail",
          context:
            "To: Eva Linn, Lundtalk Industries\nFrom: Technical Services\nDate: January 15\nSubject: Technical query\n\nDear Ms. Linn,\n\nThank you for contacting our technical department **_**(135) your query. **_**(136), our call got\ndisconnected when we were trying to reboot your system from our remote location. **_**(137).\nTherefore, please call us at your earliest convenience and refer to conversation ID #TECH12-\n2020A to complete the system repair. We have prioritized your inquiry and look forward to helping\nyou **_**(138) your computer to its full capabilities.\n\nSincerely,\n\nArthur Feldt\nTechnical Service Facilitator",
          questions: [
            {
              id: 135,
              question:
                "Thank you for contacting our technical department **_**(135) your query.",
              options: {
                A: "until",
                B: "besides",
                C: "into",
                D: "with",
              },
              answer: "",
              explanation: {},
            },
            {
              id: 136,
              question:
                "**_**(136), our call got disconnected when we were trying to reboot your system from our remote location.",
              options: {
                A: "In other words",
                B: "For this reason",
                C: "For example",
                D: "As you know",
              },
              answer: "",
              explanation: {},
            },
            {
              id: 137,
              question:
                "Our call got disconnected when we were trying to reboot your system from our remote location. **_**(137). Therefore, please call us at your earliest convenience and refer to conversation ID #TECH12-2020A to complete the system repair.",
              options: {
                A: "We invite you to visit one of our computer repair centers in your area.",
                B: "Unfortunately, we do not have a phone number at which we can reach you.",
                C: "Thank you again for being one of our priority customers.",
                D: "Please submit your check for the service fee promptly.",
              },
              answer: "",
              explanation: {},
            },
            {
              id: 138,
              question:
                "We have prioritized your inquiry and look forward to helping you **_**(138) your computer to its full capabilities.",
              options: {
                A: "restore",
                B: "restoring",
                C: "restored",
                D: "restoration",
              },
              answer: "",
              explanation: {},
            },
          ],
        },
      ];

      const toeicTest = new ToeicTest();
      toeicTest.title = dto.title;
      toeicTest.timeLimit = dto.timeLimit || 45;
      // const result = await this.toeicRepository.save(toeicTest);

      const part5Questions = raw5.map((q) => {
        const question = new ToeicQuestion();
        question.question_id = q.id;
        question.question = q.question;
        question.options = q.options;
        question.answer = q.answer;
        question.explanation = JSON.stringify(q.explanation); // chỉ string, không gắn object khác
        return question;
      });

      raw6.map((passage) => {
        const group = new ToeicGroupQuestion();
        group.title = passage.title;
        group.context = passage.context;
        this.toeicGroupRepository.save(group); // save group trước để có id
      });

      const part6Questions = raw6
        .flatMap((passage) => passage.questions)
        .map((q) => {
          const question = new ToeicQuestion();
          question.question_id = q.id;
          question.question = q.question;
          question.options = q.options;
          question.answer = q.answer;
          question.explanation = JSON.stringify(q.explanation); // chỉ string, không gắn object khác
          return question;
        });

      toeicTest.questions = [...part5Questions, ...part6Questions];

      const result = await this.toeicRepository.save(toeicTest);

      // Save
      const part5Saved = await this.partRepository.save(part5); // save questions part5
      const part6Saved = await this.partRepository.save(part6); // save groups + questions part6

      // ====== 3️⃣ Tạo Test ======
      // const toeicTest = this.toeicRepository.create({
      //   title: dto.title,
      //   timeLimit: dto.timeLimit || 45,
      // });

      // const result = await this.toeicRepository.save(toeicTest);
      // Logger.log("✅ Toeic test đã được lưu thành công!");
      return result;
    } catch (error) {
      throw new BadRequestException({
        message:
          "Không thể xử lý file PDF. Kiểm tra lại định dạng: " +
          (error.message ? error.message : error),
        detail: error.message ? error.message : error,
      });
    }
  }

  async createGroupsWithQuestions(data: any[], part: ToeicPart) {
    const groups = data.map((passage) => {
      const group = new ToeicGroupQuestion();
      group.title = passage.title;
      group.context = passage.context;

      // Tạo questions
      group.questions = passage.questions.map((q) => {
        const question = new ToeicQuestion();
        question.question_id = q.id;
        question.question = q.question;
        question.options = q.options;
        question.answer = q.answer;
        question.explanation = q.explanation;
        // question.part = part; // hoặc lấy part từ passage nếu khác nhau
        return question;
      });

      return group;
    });

    return this.toeicGroupRepository.save(groups); // cascade sẽ lưu cả questions
  }

  async findAll() {
    return this.toeicRepository.findAllWithParts();
  }
}
