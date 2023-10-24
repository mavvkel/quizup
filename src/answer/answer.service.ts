import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  findByQuestionID(questionID: number) {
    return this.answerRepository
      .createQueryBuilder('answer')
      .where('answer.questionId = :id', { id: questionID })
      .getMany();
  }
}
