import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResolver } from './question.resolver';
import { AnswerService } from 'src/answer/answer.service';
import { repositoryMockFactory } from 'src/answer/answer.service.spec';
import { Answer } from 'src/answer/entities/answer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('QuestionResolver', () => {
  let resolver: QuestionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionResolver,
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
