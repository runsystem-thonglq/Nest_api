import { Test, TestingModule } from '@nestjs/testing';
import { ToeicService } from './toeic.service';

describe('ToeicService', () => {
  let service: ToeicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToeicService],
    }).compile();

    service = module.get<ToeicService>(ToeicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
