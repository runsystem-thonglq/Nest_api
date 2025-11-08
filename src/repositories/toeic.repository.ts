import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ToeicTest } from "@entities/toeic.entity";

@Injectable()
export class ToeicRepository extends Repository<ToeicTest> {
  constructor(private dataSource: DataSource) {
    super(ToeicTest, dataSource.createEntityManager());
  }

  async findAllWithParts() {
    return this.find({ relations: ["parts", "parts.questions"] });
  }
}
