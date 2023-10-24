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
    console.log('[DEBUG]: AnswerService findByQuestionID() called');
    return this.answerRepository
      .createQueryBuilder('answer')
      .where('answer.questionId = :id', { id: questionID })
      .getMany();
  }
  
  //create(answerDetails: CreateAnswerInput) {
  //  console.log('[DEBUG]: QuestionService create called');
  //  const newAnswer = this.answerRepository.create({ ...answerDetails });
  //  return this.answerRepository.save(newAnswer);
  //}
}
