import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';
import { QuestionType } from './QuestionType';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(QuestionType, { name: 'QuestionType' });

@ObjectType()
@Entity()
export class Question {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field((type) => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: ['insert', 'update', 'remove'],
  })
  answers: Answer[];

  @Field((type) => QuestionType)
  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
