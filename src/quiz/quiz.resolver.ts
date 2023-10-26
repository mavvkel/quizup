import {
  Resolver,
  Int,
  Query,
  Mutation,
  Parent,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { QuestionService } from 'src/question/QuestionService';
import { CreateQuizInput } from './dto/create-quiz.input';
import { Question } from 'src/question/entities/question.entity';
import { Quiz } from './entities/quiz.entity';

@Resolver((type) => Quiz)
export class QuizResolver {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
  ) {}

  @Mutation((returns) => Quiz)
  async createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return await this.quizService.create(createQuizInput);
  }

  @Query((returns) => [Quiz])
  async quizzes(): Promise<Quiz[]> {
    return await this.quizService.findAll();
  }

  @Query((returns) => Quiz, { nullable: true })
  async quiz(@Args('id', { type: () => Int }) id: number): Promise<Quiz> {
    return await this.quizService.findOne(id);
  }

  @ResolveField((returns) => [Question])
  async questions(@Parent() quiz: { id: number }): Promise<Question[]> {
    const { id } = quiz;
    return await this.questionService.findByQuizID(id);
  }
}
