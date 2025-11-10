import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ToeicQuestion } from "@entities/toeic-question.entity";

@Injectable()
export class ToeicQuestionRepository extends Repository<ToeicQuestion> {
  constructor(private dataSource: DataSource) {
    super(ToeicQuestion, dataSource.createEntityManager());
  }

  async findAllWithParts() {
    return this.find({ relations: ["parts", "parts.questions"] });
  }
}
