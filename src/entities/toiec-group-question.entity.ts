import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ToeicQuestion } from "./toeic-question.entity";
import { ToeicTest } from "./toeic.entity";

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
  @ManyToOne(() => ToeicTest, (q) => q.groups, {
    cascade: true,
    eager: false, // ✅ Thêm dòng này
  })
  test: ToeicTest;
}
