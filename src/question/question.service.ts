import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { QuestionType } from './entities/QuestionType';

function hasDefinedRanks(question: CreateQuestionInput) : boolean {
  // [DEBUG]
  console.log(question.answers)
  return !question.answers.some((answer) => answer.rank == null)
}

function countCorrectAnswers(question: CreateQuestionInput) : number {
  let count : number = 0;
  for (var answer of question.answers)
    if (answer.isCorrect) { count++; }
  return count;
}

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  create(questionDetails: CreateQuestionInput) {
    console.log('[DEBUG]: QuestionService create called');
    console.log('Got:');
    console.log(questionDetails);
    const question : Question = new Question();
    const newQuestion = this.questionRepository.merge(
      question,
      { });
    return this.questionRepository.save(newQuestion); // LEARN: this is async
  }

  //findAll() {
  //  console.log('[DEBUG]: QuestionService findAll() called');
  //  return this.questionRepository.find();
  //}

  findByQuizID(quizID: number) {
    console.log('[DEBUG]: QuestionService findByQuizID() called');
    return this.questionRepository
      .createQueryBuilder('question')
      .where('question.quizId = :id', { id: quizID })
      .getMany();
  }

  augmentQuestionTypes(questions: CreateQuestionInput[]) {
    var questionsWithTypes = questions;
    for (var question of questionsWithTypes) {
      // OpenQuestion has 1 answer - the correct one
      if (question.answers.length === 1) { question['type'] = QuestionType.OPEN; }
      // SortingQuestion has more than 1 answer & no correct ones & ranks defined
      else if (hasDefinedRanks(question)) { question['type'] = QuestionType.SORTING; }
      // SingleChoiceQuestion has more than 1 answer & 1 correct one & no ranks defined
      else if (countCorrectAnswers(question) === 1) { question['type'] = QuestionType.SINGLECHOICE; }
      // MultipleChoiceQuestion has more than 1 answer & more than 0 correct one & no ranks defined
      else { question['type'] = QuestionType.MULTIPLECHOICE; }
    }
    // [DEBUG]
    console.log(questionsWithTypes)
    return questionsWithTypes;

  }

  // findOne(id: number) {
  //   return `This action returns a #${id} quiz`;
  // }

  // update(id: number, updateQuestionInput: UpdateQuestionInput) {
  //   return `This action updates a #${id} quiz`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} quiz`;
  // }
}
