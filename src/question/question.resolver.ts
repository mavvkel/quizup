import { Resolver, ResolveField } from '@nestjs/graphql';
import { Parent } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerService } from 'src/answer/answer.service';
import { Question } from './entities/question.entity';

@Resolver((type) => Question)
export class QuestionResolver {
  constructor(private answerService: AnswerService) {}

  @ResolveField((returns) => [Answer])
  async answers(@Parent() question: { id: number }): Promise<Answer[]> {
    const { id } = question;
    return await this.answerService.findByQuestionID(id);
  }
}
