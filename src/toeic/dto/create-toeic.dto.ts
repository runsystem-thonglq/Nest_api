import { IsNotEmpty, IsOptional, IsNumber, IsArray } from "class-validator";

export class CreateToeicDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNumber()
  timeLimit?: number;
}
