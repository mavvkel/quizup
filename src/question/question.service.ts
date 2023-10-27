import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { QuestionType } from './entities/QuestionType';
import { QuestionTypeError } from './QuestionTypeError';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  findByQuizID(quizID: number) {
    return this.questionRepository
      .createQueryBuilder('question')
      .where('question.quizId = :id', { id: quizID })
      .getMany();
  }

  findByID(ID: number): Promise<Question> {
    return this.questionRepository
      .createQueryBuilder('question')
      .where('question.id = :id', { id: ID })
      .getOne();
  }

  augmentQuestionTypes(
    questions: CreateQuestionInput[],
  ): DeepPartial<Question>[] {
    const questionsWithTypes: DeepPartial<Question>[] = questions;
    for (const question of questionsWithTypes) {
      // OpenQuestion has 1 answer - the correct one
      if (
        question.answers.length === 1 &&
        question.answers[0].isCorrect === true
      ) {
        question['type'] = QuestionType.OPEN;
      }

      // SortingQuestion has more than 1 answer & no correct ones & ranks defined
      else if (
        question.answers.length > 1 &&
        QuestionService.countCorrectAnswers(question) === Number(0) &&
        QuestionService.hasDefinedRanks(question)
      ) {
        question['type'] = QuestionType.SORTING;
      }

      // SingleChoiceQuestion has more than 1 answer & 1 correct one & no ranks defined
      else if (
        question.answers.length > 1 &&
        QuestionService.countCorrectAnswers(question) === 1 &&
        !QuestionService.hasDefinedRanks(question)
      ) {
        question['type'] = QuestionType.SINGLECHOICE;
      }

      // MultipleChoiceQuestion has more than 1 answer & more than 0 correct one & no ranks defined
      else if (
        question.answers.length > 1 &&
        QuestionService.countCorrectAnswers(question) >= 1 &&
        !QuestionService.hasDefinedRanks(question)
      ) {
        question['type'] = QuestionType.MULTIPLECHOICE;
      }
      // Unrecognized Question type
      else {
        throw new QuestionTypeError('Undefined Question type.', undefined);
      }
    }

    return questionsWithTypes;
  }

  static hasDefinedRanks(
    question: CreateQuestionInput | DeepPartial<Question>,
  ): boolean {
    return !question.answers.some((answer) => answer.rank == null);
  }

  static countCorrectAnswers(
    question: CreateQuestionInput | DeepPartial<Question>,
  ): number {
    if (!question.answers)
      throw new QuestionTypeError(
        'Question.answers property is undefined.',
        undefined,
      );

    let count: number = 0;
    for (const answer of question.answers)
      if (answer.isCorrect) {
        count++;
      }
    return count;
  }
}
