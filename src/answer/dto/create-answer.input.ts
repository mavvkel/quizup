import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field()
  readonly content: string;

  @Field({ nullable: true })
  readonly isCorrect: boolean;

  @Field((type) => Int, { nullable: true })
  readonly rank: number;
}
