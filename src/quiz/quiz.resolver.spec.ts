import { Test, TestingModule } from '@nestjs/testing';
import { QuizResolver } from './quiz.resolver';
import { QuestionService } from 'src/question/question.service';
import { QuizService } from './quiz.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/answer/answer.service.spec';
import { Quiz } from './entities/quiz.entity';
import { Question } from 'src/question/entities/question.entity';

describe('QuizResolver', () => {
  let resolver: QuizResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizResolver,
        QuizService,
        QuestionService,
        {
          provide: getRepositoryToken(Quiz),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Question),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    resolver = module.get<QuizResolver>(QuizResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
