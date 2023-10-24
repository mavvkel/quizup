import { InputType, Field } from '@nestjs/graphql';
import { CreateAnswerInput } from 'src/answer/dto/create-answer.input';

@InputType()
export class CreateQuestionInput {
  @Field()
  readonly text: string;

  @Field(type => [CreateAnswerInput])
  readonly answers: CreateAnswerInput[];
}
