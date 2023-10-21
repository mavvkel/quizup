import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResolver } from './question.resolver';
// import { QuestionService } from './quiz.service';

describe('QuestionResolver', () => {
  let resolver: QuestionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionResolver],
    }).compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // it('')
});
