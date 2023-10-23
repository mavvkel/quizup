import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  // create(questionDetails: CreateQuestionInput) {
  //   console.log('[DEBUG]: QuestionService create called');
  //   const newQuestion = this.questionRepository.create({ ...questionDetails });
  //   return this.questionRepository.save(newQuestion); // LEARN: this is async
  // }

  //findAll() {
  //  console.log('[DEBUG]: QuestionService findAll() called');
  //  return this.questionRepository.find();
  //}

  findByQuizID(quizID: number) {
    console.log('[DEBUG]: QuestionService findByQuizID() called');
    return this.questionRepository
      .createQueryBuilder('question')
      .where('question.quiz_id = :id', { id: quizID })
      .getMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} quiz`;
  // }

  // update(id: number, updateQuestionInput: UpdateQuestionInput) {
  //   return `This action updates a #${id} quiz`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} quiz`;
  // }
}
