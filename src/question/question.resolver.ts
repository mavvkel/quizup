import { Resolver, ResolveField, Mutation, Args } from '@nestjs/graphql';
import { Parent } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerService } from 'src/answer/answer.service';
import { Question } from './entities/question.entity';

@Resolver(type => Question)
export class QuestionResolver {
  constructor(
    private answerService: AnswerService,
  ) {}

  //@Mutation()
  //createQuestion(
  //  @Args('questionDetails') questionDetails: CreateQuestionInput,
  //) {
  //  return this.questionService.create({ ...questionDetails });
  //}
  
  @ResolveField(returns => [Answer])
  async answers(@Parent() question: { id: number; } ): Promise<Answer[]> {
    console.log('[DEBUG]: QuestionResolver .answers called');
    const { id } = question;
    return await this.answerService.findByQuestionID(id);
  }
}
