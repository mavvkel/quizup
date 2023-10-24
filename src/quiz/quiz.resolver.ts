import { Resolver, Int, Query, Mutation, Parent, Args, ResolveField } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { QuestionService } from 'src/question/question.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { Question } from 'src/question/entities/question.entity';
import { Quiz } from './entities/quiz.entity';

@Resolver(type => Quiz)
export class QuizResolver {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
  ) {}

  @Mutation(returns => Quiz)
  async createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    console.log('[DEBUG]: QuizResolver createQuiz() called');
    return await this.quizService.create(createQuizInput);
  }

  @Query(returns => [Quiz])
  async quizzes(): Promise<Quiz[]> {
    console.log('[DEBUG]: QuizResolver quizzes() called');
    return await this.quizService.findAll();
  }

  @Query(returns => Quiz, { nullable: true }) // LEARN: queries by ID should be nullable in case the entity with that ID does not exist
  async quiz(@Args('id', { type: () => Int }) id: number): Promise<Quiz> {
    return await this.quizService.findOne(id);
  }

  @ResolveField(returns => [Question])
  async questions(@Parent() quiz: { id: number; } ): Promise<Question[]> {
    console.log('[DEBUG]: QuizResolver .questions called');
    const { id } = quiz;
    return await this.questionService.findByQuizID(id);
  }

  //@Mutation('updateQuiz')
  //update(@Args('updateQuizInput') updateQuizInput: UpdateQuizInput) {
  //  return this.quizService.update(updateQuizInput.id, updateQuizInput);
  //}

  //@Mutation('removeQuiz')
  //remove(@Args('id') id: number) {
  //  return this.quizService.remove(id);
  //}
}
