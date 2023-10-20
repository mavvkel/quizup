import { Injectable } from '@nestjs/common';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';

// [DEBUG] Mock DB
const algebraQuestionsList = [
  {
    id: 1,
    text: 'What is (a+b)^2 equal to?',
    options: [
      { id: 1, text: 'a^2 + b^2' },
      { id: 2, text: 'a^2 + 2ab + b^2' },
      { id: 3, text: 'a^2 - 2ab + b^2' },
    ],
    correctAnswer: { id: 2, text: 'a^2 + 2ab + b^2' },
  },
  {
    id: 2,
    text: 'Is multiplication commutative?',
    options: [
      { id: 4, text: 'Yes' },
      { id: 5, text: 'No' },
    ],
    correctAnswer: { id: 4, text: 'Yes' },
  },
];

const automataQuestionsList = [
  {
    id: 3,
    text: 'Are Context Free Languages closed under union?',
    options: [
      { id: 6, text: 'No' },
      { id: 7, text: 'Yes' },
    ],
    correctAnswer: { id: 7, text: 'Yes' },
  },
  {
    id: 4,
    text: 'What machine accepts Context Free Languages?',
    options: [
      { id: 8, text: 'Push-down Automaton' },
      { id: 9, text: 'Finite Automaton' },
      { id: 10, text: 'Turing Machine with Stop Property' },
    ],
    correctAnswer: { id: 8, text: 'Push-down Automaton' },
  },
];

const quizzesList = [
  { id: 1, name: 'Algebra quiz', questions: algebraQuestionsList },
  { id: 2, name: 'Automata theory quiz', questions: automataQuestionsList },
  { id: 3, name: 'English quiz' },
];

@Injectable()
export class QuizService {
  create(createQuizInput: CreateQuizInput) {
    console.log('Creation of mutation service called');
    return createQuizInput;
  }

  findAll() {
    console.log('[DEBUG]: QuizService findAll() called]');
    return quizzesList;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizInput: UpdateQuizInput) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
