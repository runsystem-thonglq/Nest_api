import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ToeicPart } from "./toeic-part.entity";

@Entity("toeic_questions")
export class ToeicQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  question: string;

  @Column({ type: "json" })
  options: Record<string, string>;

  @Column({ nullable: true })
  answer: string;

  @Column({ nullable: true, type: "text" })
  explanation: string;

  @ManyToOne(() => ToeicPart, (part) => part.questions, { onDelete: "CASCADE" })
  part: ToeicPart;
}
