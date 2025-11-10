import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ToeicService } from "./toeic.service";
import { CreateToeicDto } from "./dto/create-toeic.dto";

@Controller("toeic")
export class ToeicController {
  constructor(private readonly toeicService: ToeicService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Body() dto: CreateToeicDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.toeicService.create(dto, file as any);
  }

  @Get()
  async findAll() {
    return this.toeicService.findAll();
  }

  @Get(":id")
  async getToeicTest(@Param("id", ParseIntPipe) id: number) {
    return this.toeicService.findById(id);
  }
}
