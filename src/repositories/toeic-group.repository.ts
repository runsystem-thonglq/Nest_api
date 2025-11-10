import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ToeicTest } from "@entities/toeic.entity";
import { ToeicGroupQuestion } from "@entities/toiec-group-question.entity";

@Injectable()
export class ToeicGroupRepository extends Repository<ToeicGroupQuestion> {
  constructor(private dataSource: DataSource) {
    super(ToeicGroupQuestion, dataSource.createEntityManager());
  }

  async findAllWithParts() {
    return this.find({ relations: ["parts", "parts.questions"] });
  }
}
