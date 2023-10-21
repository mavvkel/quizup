import { Module } from '@nestjs/common';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';

@Module({
  // LEARN: Only mentioned Object repositories will be available to this module
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}
