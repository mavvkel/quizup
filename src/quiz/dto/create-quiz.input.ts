import { InputType, Field } from '@nestjs/graphql';
import { CreateQuestionInput } from 'src/question/dto/create-question.input';

@InputType()
export class CreateQuizInput {
  @Field()
  readonly title: string;

  @Field((type) => [CreateQuestionInput])
  readonly questions: CreateQuestionInput[];
}
