import { Resolver } from '@nestjs/graphql';
import { Answer } from './entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {}
