import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ChildEntity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AnswerOption, SortingAnswerOption } from './answeroption.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class ChoiceQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => AnswerOption, (answerOption) => answerOption.question)
  answerOptions: AnswerOption[];
}

@ChildEntity()
export class SingleChoiceQuestion extends ChoiceQuestion {
  @OneToOne(() => AnswerOption)
  correctAnswer: AnswerOption;
}

@ChildEntity()
export class MultipleChoiceQuestion extends ChoiceQuestion {
  @OneToMany(() => AnswerOption, (answerOption) => answerOption.question)
  correctAnswers: AnswerOption[];
}

@ChildEntity()
export class SortingChoiceQuestion extends ChoiceQuestion {
  @OneToMany(
    () => SortingAnswerOption,
    (sortingAnswerOption) => sortingAnswerOption.question,
  )
  correctAnswer: SortingAnswerOption[];
}
