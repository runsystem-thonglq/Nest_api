import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1762588826683 implements MigrationInterface {
    name = 'Migrations1762588826683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "toeic_questions" ("id" SERIAL NOT NULL, "question" text NOT NULL, "options" json NOT NULL, "answer" character varying, "explanation" text, "part_id" integer, CONSTRAINT "PK_ee1be7442c5309f575de38c81f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "toeic_parts" ("id" SERIAL NOT NULL, "part" integer NOT NULL, "title" character varying, "context" text, "passage_id" integer, "test_id" integer, CONSTRAINT "PK_0a31882f9fc66ebb9ee06e55ec6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "toeic_tests" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "time_limit" integer NOT NULL DEFAULT '45', "file_path" character varying, CONSTRAINT "PK_047f587a2eda8626443b0126d54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "toeic_questions" ADD CONSTRAINT "FK_85665af754191f8a29ce0736e2d" FOREIGN KEY ("part_id") REFERENCES "toeic_parts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "toeic_parts" ADD CONSTRAINT "FK_8231b9bc9bb3208c769813f5aae" FOREIGN KEY ("test_id") REFERENCES "toeic_tests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toeic_parts" DROP CONSTRAINT "FK_8231b9bc9bb3208c769813f5aae"`);
        await queryRunner.query(`ALTER TABLE "toeic_questions" DROP CONSTRAINT "FK_85665af754191f8a29ce0736e2d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "toeic_tests"`);
        await queryRunner.query(`DROP TABLE "toeic_parts"`);
        await queryRunner.query(`DROP TABLE "toeic_questions"`);
    }

}
