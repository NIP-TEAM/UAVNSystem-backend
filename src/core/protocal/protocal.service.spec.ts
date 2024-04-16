import { Test, TestingModule } from '@nestjs/testing';
import { ProtocalService } from './protocal.service';

describe('ProtocalService', () => {
  let service: ProtocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtocalService],
    }).compile();

    service = module.get<ProtocalService>(ProtocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
