import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [QuizModule],
  // LEARN: Remember to put all the written controllers here.
  controllers: [AppController],
  // LEARN: Services are single-purposed classes that are injected into their
  // consumers to accomplish some particular goal (f.e. retrieve data).
  // LEARN: Nest will take care of injecting all the providers (f.e. Services),
  // into their consumers (f.e. Controllers).
  providers: [AppService],
})
export class AppModule {}
