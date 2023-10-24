import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { QuestionService } from 'src/question/question.service';
import { CreateQuestionInput } from 'src/graphql';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    private questionService: QuestionService,
  ) {}

  async create(createQuizInput: CreateQuizInput): Promise<Quiz> {
    console.log('[DEBUG]: QuizService create() called');

    const newQuestionsWithTypes = this.questionService.augmentQuestionTypes(createQuizInput.questions);
    const newQuiz : Quiz = this.quizRepository.create({ title: createQuizInput.title, questions: newQuestionsWithTypes})
    const savedQuiz : Quiz = await this.quizRepository.save(newQuiz);
    return savedQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    console.log('[DEBUG]: QuizService findAll() called');
    return await this.quizRepository.find(); // LEARN: repository.find() <=> SELECT * FROM table
  }

  async findOne(id: number): Promise<Quiz> {
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
