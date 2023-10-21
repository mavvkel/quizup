import { Resolver, ResolveField } from '@nestjs/graphql';

@Resolver('Question')
export class QuestionResolver {
  @ResolveField()
  __resolveType(question, contextValue, info) {
    console.log('[DEBUG]: __resolveType called');
    if (question.correctAnswer) {
      return 'SingleChoiceQuestion';
    }
    return null;
  }
}
