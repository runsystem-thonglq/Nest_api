import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ToeicTest } from "./toeic.entity";
import { ToeicQuestion } from "./toeic-question.entity";

@Entity("toeic_parts")
export class ToeicPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  part: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  context: string;

  @Column({ name: "passage_id", nullable: true })
  passageId: number;

  @ManyToOne(() => ToeicTest, (test) => test.parts, { onDelete: "CASCADE" })
  test: ToeicTest;

  @OneToMany(() => ToeicQuestion, (q) => q.part, { cascade: true })
  questions: ToeicQuestion[];
}
