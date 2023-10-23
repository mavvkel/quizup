import { Resolver, ResolveField, Mutation, Args } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
//import { AnswerService } from 'src/answer/answer.service';
import { Query, Parent } from '@nestjs/graphql';

@Resolver('Question')
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  //@Mutation()
  //createQuestion(
  //  @Args('questionDetails') questionDetails: CreateQuestionInput,
  //) {
  //  return this.questionService.create({ ...questionDetails });
  //}

  //@ResolveField()
  //__resolveType(question, contextValue, info) {
  //  console.log('[DEBUG]: __resolveType called');
  //  if (question.correctAnswer && !question.options) {
  //    return 'OpenQuestion';
  //  } else if (question.correctAnswersIDs) {
  //    return 'MultipleChoiceQuestion';
  //  } else if (question.correctAnswer) {
  //    return 'SingleChoiceQuestion';
  //  } else if (question.correctSorting) {
  //    return 'SortingChoiceQuestion';
  //  }
  //  return null;
  //}
}
