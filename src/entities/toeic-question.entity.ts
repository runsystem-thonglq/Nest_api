import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ToeicGroupQuestion } from "./toiec-group-question.entity";
import { ToeicTest } from "./toeic.entity";

@Entity("toeic_questions")
export class ToeicQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "question_id", nullable: true })
  question_id: number;

  @Column({ type: "text" })
  question: string;

  @Column({ type: "json" })
  options: Record<string, string>;

  @Column({ nullable: true })
  answer: string;

  @Column({ nullable: true, type: "text" })
  explanation: string;

  @ManyToOne(() => ToeicGroupQuestion, (group) => group.questions, {
    onDelete: "CASCADE",
    nullable: true,
  })
  group: ToeicGroupQuestion;
  @ManyToOne(() => ToeicTest, (tes) => tes.questions, {
    onDelete: "CASCADE",
    nullable: true,
  })
  test: ToeicTest;
}
