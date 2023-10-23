import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  //create(createQuizInput: CreateQuizInput) {
  //  console.log('Creation of mutation service called');
  //  return createQuizInput;
  //}

  async findAll() {
    console.log('[DEBUG]: QuizService findAll() called');
    return await this.quizRepository.find(); // LEARN: repository.find() <=> SELECT * FROM table
  }

  async findOne(id: number) {
    console.log('[DEBUG]: QuizService findOne() called');
    return await this.quizRepository.findOneBy({ id });
  }

  //update(id: number, updateQuizInput: UpdateQuizInput) {
  //  return `This action updates a #${id} quiz`;
  //}

  //remove(id: number) {
  //  return `This action removes a #${id} quiz`;
  //}
}
