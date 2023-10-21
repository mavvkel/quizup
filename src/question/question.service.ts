import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
// import { UpdateQuestionInput } from './dto/update-quiz.input';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private choiceQuestionRepository: Repository<Question>,
  ) {}
  //create(createQuestionInput: CreateQuestionInput) {
  //  console.log('Creation of mutation service called');
  //  return createQuestionInput;
  //}

  findAll() {
    console.log('[DEBUG]: QuestionService findAll() called]');
    return this.choiceQuestionRepository.find();
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
