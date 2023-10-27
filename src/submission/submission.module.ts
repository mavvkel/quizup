import { Module } from '@nestjs/common';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  providers: [
    SubmissionResolver,
    SubmissionService,
    QuestionService,
    AnswerService,
  ],
})
export class SubmissionModule {}
