import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Score } from './dto/score.output';
import { QuizSubmissionInput } from './dto/quizsubmission.input';

@Resolver(() => Score)
export class SubmissionResolver {

  @Mutation((returns) => Score)
  async scoreSubmission(
    @Args('submissionInput') submissionInput: QuizSubmissionInput,
  ): Promise<Score> {
    const score: Score = new Score();
    score.points = 101;
    return score; // place for call to submissionService scoring func
  }
}
