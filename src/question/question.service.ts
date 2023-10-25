import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { QuestionType } from './entities/QuestionType';

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

  augmentQuestionTypes(questions: CreateQuestionInput[]) {
    const questionsWithTypes = questions;
    for (const question of questionsWithTypes) {
      // OpenQuestion has 1 answer - the correct one
      if (question.answers.length === 1) {
        question['type'] = QuestionType.OPEN;
      }
      // SortingQuestion has more than 1 answer & no correct ones & ranks defined
      else if (QuestionService.hasDefinedRanks(question)) {
        question['type'] = QuestionType.SORTING;
      }
      // SingleChoiceQuestion has more than 1 answer & 1 correct one & no ranks defined
      else if (QuestionService.countCorrectAnswers(question) === 1) {
        question['type'] = QuestionType.SINGLECHOICE;
      }
      // MultipleChoiceQuestion has more than 1 answer & more than 0 correct one & no ranks defined
      else {
        question['type'] = QuestionType.MULTIPLECHOICE;
      }
    }

    return questionsWithTypes;
  }

  findByID(ID: number): Promise<Question> {
    return this.questionRepository
      .createQueryBuilder('question')
      .where('question.id = :id', { id: ID })
      .getOne();
  }

  static hasDefinedRanks(question: CreateQuestionInput): boolean {
    return !question.answers.some((answer) => answer.rank == null);
  }

  static countCorrectAnswers(question: CreateQuestionInput): number {
    let count: number = 0;
    for (const answer of question.answers)
      if (answer.isCorrect) {
        count++;
      }
    return count;
  }
}
