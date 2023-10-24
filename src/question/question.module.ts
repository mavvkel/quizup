import { Module } from '@nestjs/common';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { AnswerService } from 'src/answer/answer.service';
import { AnswerModule } from 'src/answer/answer.module';
import { Answer } from 'src/answer/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer]), AnswerModule],
  providers: [QuestionResolver, QuestionService, AnswerService],
})
export class QuestionModule {}

