import { Injectable } from '@nestjs/common';
import { QuizSubmissionInput } from './dto/quizsubmission.input';
import { Score } from './dto/score.output';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionSubmissionInput } from './dto/questionsubmission.input';
import { Answer } from 'src/answer/entities/answer.entity';
import { QuestionType } from 'src/question/entities/QuestionType';
import { Question } from 'src/question/entities/question.entity';
import { compareArrays } from 'src/util';

@Injectable()
export class SubmissionService {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) {}

  async score(submission: QuizSubmissionInput): Promise<Score> {
    const questions: Question[] = await this.questionService.findByQuizID(
      submission.quizID,
    );

    const totalScore: Score = { points: 0, outOf: questions.length };
    for (const answer of submission.answers) {
      totalScore.points += await this.scoreQuestionSubmission(answer);
    }

    return totalScore;
  }

  async scoreQuestionSubmission(
    questionSubmission: QuestionSubmissionInput,
  ): Promise<number> {
    const question: Question = await this.questionService.findByID(
      questionSubmission.questionID,
    );
    const correct: Answer[] = await this.answerService.findCorrectByQuestionID(
      questionSubmission.questionID,
    );

    switch (question.type) {
      case QuestionType.SINGLECHOICE: {
        return Number(correct[0].id === questionSubmission.answerID);
      }

      case QuestionType.MULTIPLECHOICE: {
        const correctIDs: number[] = correct.map((ans) => ans.id).sort();

        return Number(
          compareArrays<number>(
            questionSubmission.answerIDs.sort(),
            correctIDs,
          ),
        );
      }

      case QuestionType.SORTING: {
        return Number(
          compareArrays<number>(
            await this.answerService.getSorting(question),
            questionSubmission.sortedAnswerIDs,
          ),
        );
      }

      case QuestionType.OPEN: {
        return Number(correct[0].content === questionSubmission.answer);
      }

      default: {
        return null;
      }
    }
  }
}
