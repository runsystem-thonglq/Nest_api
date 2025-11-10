import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
}
