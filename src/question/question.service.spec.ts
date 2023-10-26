import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/answer/answer.service.spec';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { QuestionTypeError } from './QuestionTypeError';
import { DeepPartial } from 'typeorm';
import { QuestionType } from './entities/QuestionType';
import { AnswerService } from 'src/answer/answer.service';
import { deepEqual } from 'assert';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('augmentQuestionTypes', () => {
    it('should throw error for question with undefined correct answers & ranks', () => {
      const createQuestionInputs: CreateQuestionInput[] = [
        {
          text: '',
          answers: [
            {
              content: '',
              isCorrect: undefined,
              rank: undefined,
            },
            {
              content: '',
              isCorrect: undefined,
              rank: undefined,
            },
          ],
        },
      ];

      // If a function is expected to throw (without a promise) an extra wrapper is necessary
      function callAugment() {
        service.augmentQuestionTypes(createQuestionInputs);
      }

      expect(callAugment).toThrowError(QuestionTypeError);
      expect(callAugment).toThrowError('Undefined Question type.');
    });

    it('should throw error for question with correct answers & ranks', () => {
      const createQuestionInputs: CreateQuestionInput[] = [
        {
          text: '',
          answers: [
            {
              content: '',
              isCorrect: true,
              rank: 1,
            },
            {
              content: '',
              isCorrect: false,
              rank: 2,
            },
          ],
        },
      ];

      // If a function is expected to throw (without a promise) an extra wrapper is necessary
      function callAugment() {
        service.augmentQuestionTypes(createQuestionInputs);
      }

      expect(callAugment).toThrowError(QuestionTypeError);
      expect(callAugment).toThrowError('Undefined Question type.');
    });

    it('should throw error for question with no answers', () => {
      const createQuestionInputs: CreateQuestionInput[] = [
        {
          text: '',
          answers: [],
        },
      ];

      // If a function is expected to throw (without a promise) an extra wrapper is necessary
      function callAugment() {
        service.augmentQuestionTypes(createQuestionInputs);
      }

      expect(callAugment).toThrowError(QuestionTypeError);
      expect(callAugment).toThrowError('Undefined Question type.');
    });

    it('should correctly assign types for each QuestionType', () => {
      const createQuestionInputs: CreateQuestionInput[] = [
        // MULTIPLECHOICE type
        {
          text: '',
          answers: [
            {
              content: '',
              isCorrect: true,
              rank: null,
            },
            {
              content: '',
              isCorrect: false,
              rank: null,
            },
            {
              content: '',
              isCorrect: true,
              rank: null,
            },
          ],
        },
        // OPEN type
        {
          text: '',
          answers: [
            {
              content: '',
              isCorrect: true,
              rank: null,
            },
          ],
        },
        // SINGLECHOICE type
        {
          text: '',
          answers: [
            {
              content: '',
              isCorrect: true,
              rank: null,
            },
            {
              content: '',
              isCorrect: false,
              rank: null,
            },
            {
              content: '',
              isCorrect: false,
              rank: null,
            },
            {
              content: '',
              isCorrect: false,
              rank: null,
            },
          ],
        },
        // SORTING type
        {
          text: '',
          answers: [
            {
              content: '',
              isCorrect: null,
              rank: 2,
            },
            {
              content: '',
              isCorrect: null,
              rank: 3,
            },
            {
              content: '',
              isCorrect: null,
              rank: 1,
            },
            {
              content: '',
              isCorrect: null,
              rank: 4,
            },
          ],
        },
      ];

      for (let i = 1; i < 4; i++)
        expect(
          service.augmentQuestionTypes(createQuestionInputs)[i],
        ).toHaveProperty('type');

      expect(
        service.augmentQuestionTypes(createQuestionInputs)[0].type,
      ).toEqual(QuestionType.MULTIPLECHOICE);
      expect(
        service.augmentQuestionTypes(createQuestionInputs)[1].type,
      ).toEqual(QuestionType.OPEN);
      expect(
        service.augmentQuestionTypes(createQuestionInputs)[2].type,
      ).toEqual(QuestionType.SINGLECHOICE);
      expect(
        service.augmentQuestionTypes(createQuestionInputs)[3].type,
      ).toEqual(QuestionType.SORTING);
    });
  });

  describe('hasDefinedRanks', () => {
    it('should return true if all answers have not null ranks', () => {
      const createQuestionInputs: CreateQuestionInput = {
        text: '',
        answers: [
          {
            content: '',
            isCorrect: null,
            rank: 1,
          },
          {
            content: '',
            isCorrect: null,
            rank: 2,
          },
          {
            content: '',
            isCorrect: null,
            rank: 3,
          },
        ],
      };

      const deepPartialQuestion: DeepPartial<Question> = {
        answers: [
          {
            rank: 1,
          },
          {
            rank: 2,
          },
          {
            rank: 3,
          },
        ],
      };

      expect(
        QuestionService.hasDefinedRanks(createQuestionInputs),
      ).toStrictEqual(true);
      expect(
        QuestionService.hasDefinedRanks(deepPartialQuestion),
      ).toStrictEqual(true);
    });

    it('should return false if at least 1 answer has null rank', () => {
      const createQuestionInputs: CreateQuestionInput = {
        text: '',
        answers: [
          {
            content: '',
            isCorrect: null,
            rank: 1,
          },
          {
            content: '',
            isCorrect: null,
            rank: 2,
          },
          {
            content: '',
            isCorrect: null,
            rank: null,
          },
        ],
      };

      const deepPartialQuestion: DeepPartial<Question> = {
        answers: [
          {
            rank: 1,
          },
          {
            rank: 2,
          },
          {
            rank: null,
          },
        ],
      };

      expect(
        QuestionService.hasDefinedRanks(createQuestionInputs),
      ).toStrictEqual(false);
      expect(
        QuestionService.hasDefinedRanks(deepPartialQuestion),
      ).toStrictEqual(false);
    });

    it('should return false if at least 1 answer has undefined rank', () => {
      const createQuestionInputs: CreateQuestionInput = {
        text: '',
        answers: [
          {
            content: '',
            isCorrect: null,
            rank: 1,
          },
          {
            content: '',
            isCorrect: null,
            rank: undefined,
          },
          {
            content: '',
            isCorrect: null,
            rank: 3,
          },
        ],
      };

      const deepPartialQuestion: DeepPartial<Question> = {
        answers: [
          {
            rank: 1,
          },
          {
            rank: undefined,
          },
          {
            rank: 3,
          },
        ],
      };

      expect(
        QuestionService.hasDefinedRanks(createQuestionInputs),
      ).toStrictEqual(false);
      expect(
        QuestionService.hasDefinedRanks(deepPartialQuestion),
      ).toStrictEqual(false);
    });

    it('should return false if at least 1 answer has missing rank property', () => {
      const deepPartialQuestion: DeepPartial<Question> = {
        answers: [
          {
            isCorrect: false,
            rank: 1,
          },
          {
            isCorrect: false,
          },
          {
            isCorrect: false,
            rank: 3,
          },
        ],
      };

      expect(
        QuestionService.hasDefinedRanks(deepPartialQuestion),
      ).toStrictEqual(false);
    });
  });

  describe('countCorrectAnswers', () => {
    it('should correctly count correct answer', () => {
      const createQuestionInputs: CreateQuestionInput = {
        text: '',
        answers: [
          {
            content: '',
            isCorrect: false,
            rank: null,
          },
          {
            content: '',
            isCorrect: false,
            rank: null,
          },
          {
            content: '',
            isCorrect: true,
            rank: null,
          },
          {
            content: '',
            isCorrect: null,
            rank: null,
          },
          {
            content: '',
            isCorrect: undefined,
            rank: null,
          },
          {
            content: '',
            isCorrect: true,
            rank: null,
          },
        ],
      };

      const deepPartialQuestion: DeepPartial<Question> = {
        answers: [
          {
            isCorrect: true,
          },
          {
            isCorrect: false,
          },
          {
            isCorrect: undefined,
          },
          {
            isCorrect: true,
          },
          {
            isCorrect: null,
          },
        ],
      };
      const deepPartialQuestion2: DeepPartial<Question> = {
        answers: [
          {
            rank: null,
          },
          {
            isCorrect: false,
          },
          {
            isCorrect: undefined,
          },
          {
            isCorrect: null,
          },
          {
            isCorrect: null,
          },
        ],
      };

      expect(
        QuestionService.countCorrectAnswers(createQuestionInputs),
      ).toStrictEqual(2);
      expect(
        QuestionService.countCorrectAnswers(deepPartialQuestion),
      ).toStrictEqual(2);
      expect(
        QuestionService.countCorrectAnswers(deepPartialQuestion2),
      ).toStrictEqual(0);
    });

    it('should return 0 on answer set', () => {
      const createQuestionInputs: CreateQuestionInput = {
        text: '',
        answers: [],
      };

      const deepPartialQuestion: DeepPartial<Question> = {
        answers: [],
      };

      expect(
        QuestionService.countCorrectAnswers(createQuestionInputs),
      ).toStrictEqual(0);
      expect(
        QuestionService.countCorrectAnswers(deepPartialQuestion),
      ).toStrictEqual(0);
    });

    it('should throw error on missing answers property', () => {
      const deepPartialQuestion: DeepPartial<Question> = {
        text: '',
      };

      function callCountCorrect() {
        QuestionService.countCorrectAnswers(deepPartialQuestion);
      }
      expect(callCountCorrect).toThrowError(QuestionTypeError);
      expect(callCountCorrect).toThrowError(
        'Question.answers property is undefined.',
      );
    });
  });
});
