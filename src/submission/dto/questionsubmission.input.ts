import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class QuestionSubmissionInput {
  @Field((type) => Int!)
  readonly questionID: number;

  @Field((type) => Int, { nullable: true})
  readonly answerID: number;

  @Field((type) => [Int], { nullable: true })
  readonly sortedAnswerIDs: number[];

  @Field({ nullable: true })
  readonly answer: string;

  @Field((type) => [Int], { nullable: true })
  readonly answerIDs: number[];
}
