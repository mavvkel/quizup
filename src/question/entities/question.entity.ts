import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';
import { QuestionType } from './QuestionType';
import { Quiz } from '../../quiz/entities/quiz.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.SINGLECHOICE,
  })
  type: QuestionType;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
