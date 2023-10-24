import { Injectable } from '@nestjs/common';
import { QuizSubmissionInput } from './dto/quizsubmission.input';
import { Score } from './dto/score.output';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionSubmissionInput } from './dto/questionsubmission.input';
import { Answer } from 'src/answer/entities/answer.entity';
import { QuestionType } from 'src/question/entities/QuestionType';
import { Question } from 'src/question/entities/question.entity';

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
    // console.log(questions); // DEBUG - if statement here based on the content

    const totalScore: Score = { points: 0, outOf: questions.length };
    for (const answer of submission.answers) {
      console.log(answer);
      totalScore.points += await this.scoreQuestionSubmission(answer);
      console.log(totalScore);
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
        const correctIDs: number[] = correct.map((ans) => ans.id);
        return Number(
          JSON.stringify(questionSubmission.answerIDs.sort()) ===
            JSON.stringify(correctIDs.sort()),
        ); // This comparison could be more efficient
      }

      case QuestionType.SORTING: {
        console.log(
          JSON.stringify(await this.answerService.getSorting(question)),
        );
        console.log(JSON.stringify(questionSubmission.sortedAnswerIDs));
        return Number(
          JSON.stringify(await this.answerService.getSorting(question)) ===
            JSON.stringify(questionSubmission.sortedAnswerIDs),
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
