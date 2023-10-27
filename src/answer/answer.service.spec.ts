import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';
import { Question } from 'src/question/entities/question.entity';
import { QuestionType } from 'src/question/entities/QuestionType';
import { Answer } from './entities/answer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'src/MockType';
import { Repository } from 'typeorm';
import { QuestionTypeError } from 'src/question/QuestionTypeError';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn();

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSorting', () => {
    it('should throw error for non-sorting question types', () => {
      const question: Question = new Question();
      question.type = QuestionType.OPEN;

      expect(service.getSorting(question)).rejects.toThrowError(
        QuestionTypeError,
      );
      expect(service.getSorting(question)).rejects.toThrowError(
        `getSorting accepts only SORTING questions, but OPEN was given.`,
      );

      question.type = QuestionType.SINGLECHOICE;
      expect(service.getSorting(question)).rejects.toThrowError(
        QuestionTypeError,
      );
      expect(service.getSorting(question)).rejects.toThrowError(
        `getSorting accepts only SORTING questions, but SINGLECHOICE was given.`,
      );

      question.type = QuestionType.MULTIPLECHOICE;
      expect(service.getSorting(question)).rejects.toThrowError(
        QuestionTypeError,
      );
      expect(service.getSorting(question)).rejects.toThrowError(
        `getSorting accepts only SORTING questions, but MULTIPLECHOICE was given.`,
      );
    });

    it('should return correct sorting of answers', () => {
      const question: Question = new Question();
      question.type = QuestionType.SORTING;
      question.answers = [
        {
          id: 4,
          content: '',
          rank: 3,
          isCorrect: null,
          question: question,
        },
        {
          id: 5,
          content: '',
          rank: 4,
          isCorrect: null,
          question: question,
        },
        {
          id: 8,
          content: '',
          rank: 2,
          isCorrect: null,
          question: question,
        },
        {
          id: 11,
          content: '',
          rank: 1,
          isCorrect: null,
          question: question,
        },
      ];

      const result = [11, 8, 4, 5];

      jest
        .spyOn(service, 'findByQuestionID')
        .mockResolvedValueOnce(question.answers);

      expect(service.getSorting(question)).resolves.toEqual(result);
    });
  });
});
