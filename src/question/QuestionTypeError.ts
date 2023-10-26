import { QuestionType } from './entities/QuestionType';

export class QuestionTypeError extends Error {
  type: QuestionType;

  constructor(message: string, type: QuestionType) {
    super(message);
    this.type = type;
  }
}
