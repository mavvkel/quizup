import { Question } from 'src/question/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Quiz {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(type => [Question])
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
