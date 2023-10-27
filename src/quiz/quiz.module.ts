import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionModule } from 'src/question/question.module';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question]), QuestionModule],
  providers: [QuizResolver, QuizService, QuestionService],
})
export class QuizModule {}
