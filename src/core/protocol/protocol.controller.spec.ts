import { Test, TestingModule } from '@nestjs/testing';
import { ProtocalController } from './protocol.controller';

describe('ProtocolController', () => {
  let controller: ProtocalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtocalController],
    }).compile();

    controller = module.get<ProtocalController>(ProtocalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
