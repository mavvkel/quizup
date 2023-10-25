import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Score } from './dto/score.output';
import { QuizSubmissionInput } from './dto/quizsubmission.input';
import { SubmissionService } from './submission.service';

@Resolver(() => Score)
export class SubmissionResolver {
  constructor(private submissionService: SubmissionService) {}

  @Mutation((returns) => Score)
  async scoreSubmission(
    @Args('submissionInput') submissionInput: QuizSubmissionInput,
  ): Promise<Score> {
    return await this.submissionService.score(submissionInput);
  }
}
