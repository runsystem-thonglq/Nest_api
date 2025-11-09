import { Test, TestingModule } from '@nestjs/testing';
import { ToeicController } from './toeic.controller';
import { ToeicService } from './toeic.service';

describe('ToeicController', () => {
  let controller: ToeicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToeicController],
      providers: [ToeicService],
    }).compile();

    controller = module.get<ToeicController>(ToeicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
