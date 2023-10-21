import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ChoiceQuestion } from './question/entities/question.entity';
import { AnswerOption } from './question/entities/answeroption.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

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

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [ChoiceQuestion, AnswerOption],
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true, // [DEBUG] remove for prod
    }),
    QuestionModule,
    QuizModule,
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
