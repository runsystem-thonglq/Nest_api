import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToeicService } from "./toeic.service";
import { ToeicController } from "./toeic.controller";
import { ToeicTest } from "@entities/toeic.entity";
import { ToeicPart } from "@entities/toeic-part.entity";
import { ToeicQuestion } from "@entities/toeic-question.entity";
import { ToeicRepository } from "@repositories/toeic.repository";
import { ToeicGroupRepository } from "@repositories/toeic-group.repository";
import { ToeicPartRepository } from "@repositories/toeic-part.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ToeicTest, ToeicPart, ToeicQuestion])],
  controllers: [ToeicController],
  providers: [
    ToeicService,
    ToeicRepository,
    ToeicGroupRepository,
    ToeicPartRepository,
  ],
  exports: [ToeicService],
})
export class ToeicModule {}
