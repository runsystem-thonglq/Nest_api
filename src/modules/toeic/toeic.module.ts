import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToeicService } from "./toeic.service";
import { ToeicController } from "./toeic.controller";
import { ToeicTest } from "@entities/toeic.entity";
import { ToeicQuestion } from "@entities/toeic-question.entity";
import { ToeicRepository } from "@repositories/toeic.repository";
import { ToeicGroupRepository } from "@repositories/toeic-group.repository";
import { ToeicQuestionRepository } from "@repositories/toeic-question.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ToeicTest, ToeicQuestion])],
  controllers: [ToeicController],
  providers: [
    ToeicService,
    ToeicRepository,
    ToeicGroupRepository,
    ToeicQuestionRepository,
  ],
  exports: [ToeicService],
})
export class ToeicModule {}
