import { InputType, Field, Int } from '@nestjs/graphql';
import { QuestionSubmissionInput } from './questionsubmission.input';

@InputType()
export class QuizSubmissionInput {
  @Field((type) => Int!)
  readonly quizID: number;

  @Field((type) => [QuestionSubmissionInput])
  readonly answers: QuestionSubmissionInput[];
}
