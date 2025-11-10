import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ToeicQuestion } from "./toeic-question.entity";

@Entity("toeic_group_questions")
export class ToeicGroupQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  context: string;

  @OneToMany(() => ToeicQuestion, (q) => q.group, {
    cascade: true,
    eager: false, // ✅ Thêm dòng này
  })
  questions: ToeicQuestion[];
}
