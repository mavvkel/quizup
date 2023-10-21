import { Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';

@Resolver('Answer')
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}
}
