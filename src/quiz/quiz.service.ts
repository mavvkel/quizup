import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    private questionService: QuestionService,
  ) {}

  async create(createQuizInput: CreateQuizInput): Promise<Quiz> {
    const newQuestionsWithTypes: DeepPartial<Question>[] =
      this.questionService.augmentQuestionTypes(createQuizInput.questions);
    const newQuiz: Quiz = this.quizRepository.create({
      title: createQuizInput.title,
      questions: newQuestionsWithTypes,
    });
    const savedQuiz: Quiz = await this.quizRepository.save(newQuiz);
    return savedQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  async findOne(id: number): Promise<Quiz> {
    return await this.quizRepository.findOneBy({ id });
  }
}
