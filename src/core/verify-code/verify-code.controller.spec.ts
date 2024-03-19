import { Test, TestingModule } from '@nestjs/testing';
import { VerifyCodeController } from './verify-code.controller';

describe('VerifyCodeController', () => {
  let controller: VerifyCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyCodeController],
    }).compile();

    controller = module.get<VerifyCodeController>(VerifyCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
