import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Answer {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  rank: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Question;

  public static compare(a: Answer, b: Answer): number {
    if (a.rank > b.rank) return 1;
    else if (a.rank < b.rank) return -1;
    else return 0;
  }
}
