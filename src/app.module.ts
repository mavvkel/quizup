import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

@Module({
  imports: [
    QuestionModule,
    QuizModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [QuestionModule, QuizModule],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  // LEARN: Remember to put all the written controllers here.
  controllers: [AppController],
  // LEARN: Services are single-purposed classes that are injected into their
  // consumers to accomplish some particular goal (f.e. retrieve data).
  // LEARN: Nest will take care of injecting all the providers (f.e. Services),
  // into their consumers (f.e. Controllers).
  providers: [AppService],
})
export class AppModule {}
