import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { repositoryMockFactory } from 'src/answer/answer.service.spec';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
