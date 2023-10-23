import { Args, Resolver, Query } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  //@Query(() => Answer)
  //answer(@Args('id') id: number): Answer {
  //  return this.answerService.findOne(id);
  //}
}
