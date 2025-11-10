import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ToeicQuestion } from "./toeic-question.entity";
import { ToeicGroupQuestion } from "./toiec-group-question.entity";

@Entity("toeic_tests")
export class ToeicTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: "time_limit", type: "int", default: 45 })
  timeLimit: number;

  @Column({ name: "file_path", nullable: true })
  filePath: string;

  @OneToMany(() => ToeicQuestion, (question) => question.test)
  questions: ToeicQuestion[];

  @OneToMany(() => ToeicGroupQuestion, (question) => question.test)
  groups: ToeicGroupQuestion;
}
