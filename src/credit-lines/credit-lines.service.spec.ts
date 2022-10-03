import { Test, TestingModule } from '@nestjs/testing';
import { CreditLinesService } from './credit-lines.service';

describe('CreditLinesService', () => {
  let service: CreditLinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditLinesService],
    }).compile();

    service = module.get<CreditLinesService>(CreditLinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
