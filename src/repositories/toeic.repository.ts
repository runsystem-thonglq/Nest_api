import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ToeicTest } from "@entities/toeic.entity";

@Injectable()
export class ToeicRepository extends Repository<ToeicTest> {
  constructor(private dataSource: DataSource) {
    super(ToeicTest, dataSource.createEntityManager());
  }

  async findFullTestById(testId: number) {
    return this.findOne({
      where: { id: testId },
      relations: {
        questions: true,
      },
    });
  }

  async findAll() {
    return this.findAll();
  }
}
