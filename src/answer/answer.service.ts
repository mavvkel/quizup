import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
import { QuestionType } from 'src/question/entities/QuestionType';
import { QuestionTypeError } from 'src/question/QuestionTypeError';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  findByQuestionID(questionID: number): Promise<Answer[]> {
    return this.answerRepository
      .createQueryBuilder('answer')
      .where('answer.questionId = :id', { id: questionID })
      .getMany();
  }

  findCorrectByQuestionID(questionID: number): Promise<Answer[]> {
    return this.answerRepository
      .createQueryBuilder('answer')
      .where('answer.questionId = :id', { id: questionID })
      .andWhere('answer.isCorrect = :correct', { correct: true })
      .getMany();
  }

  async getSorting(question: Question): Promise<number[]> {
    if (question.type != QuestionType.SORTING) {
      throw new QuestionTypeError(
        `getSorting accepts only SORTING questions, but ${
          QuestionType[question.type]
        } was given.`,
        question.type,
      );
    }

    const answers: Answer[] = await this.findByQuestionID(question.id);
    const sortedIDs: number[] = answers
      .sort(Answer.compare)
      .map((answer) => answer.id);
    return sortedIDs;
  }
}
