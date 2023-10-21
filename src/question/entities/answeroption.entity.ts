import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ChildEntity,
  ManyToOne,
} from 'typeorm';
import { ChoiceQuestion } from './question.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class AnswerOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(
    () => ChoiceQuestion,
    (choiceQuestion) => choiceQuestion.answerOptions,
  )
  question: ChoiceQuestion;
}

@ChildEntity()
export class SortingAnswerOption extends AnswerOption {
  @Column()
  sortedIndex: number;
}
