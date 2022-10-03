import { Test, TestingModule } from '@nestjs/testing';
import { CreditLinesController } from './credit-lines.controller';

describe('CreditLinesController', () => {
  let controller: CreditLinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditLinesController],
    }).compile();

    controller = module.get<CreditLinesController>(CreditLinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
