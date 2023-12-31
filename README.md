<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Application for creating, taking & scoring simple quizzes using GraphQL API.

## Required dependencies
node 18.x

Docker (for running DB using docker-compose)

## Installation

```bash
$ npm install
```

## Running the app
The app requires a .env file with the following variables specified:
```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
HOST=
DB_PORT=
```

```bash
$ docker-compose up -d
```
Then run the application.
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API usage

To use the GraphQL API manually send POST request with a GraphQL query or mutation in the body to localhost:3000/graphql view to do it via ApolloGraphQL playground.

Retrieve a quiz with
```graphql
query Query($quizId: Int!) {
  quiz(id: $quizId) {
    ...
  }
}
```

Create a quiz with
```graphql
mutation Mutation($createQuizInput: CreateQuizInput!) {
  createQuiz(createQuizInput: $createQuizInput) {
    ...
  }
}
```
with the input of form
```graphql
{
  "createQuizInput": {
    "title": "<String>",
    "questions": [
      {
        "text": "<String>",
        "answers": [
          {
            "content": "<String>",
            "isCorrect": <Boolean>,
            "rank": <null or Int>
          }
        ]
      }
    ]
  }
}
```

Score a quiz submission with
```graphql
mutation ScoreSubmission($submissionInput: QuizSubmissionInput!) {
  scoreSubmission(submissionInput: $submissionInput) {
    points
    outOf
  }
}
```
with the input of form
```graphql
{
  "submissionInput": {
    "quizID": <Int>,
    "answers": [
      // For single choice questions
      {
        "questionID": <Int>,
        "answerID": <Int>,
      },
      // For multiple choice questions
      {
        "questionID": <Int>,
        "answerIDs": <[Int]>,
      },
      // For sorting questions
      {
        "questionID": <Int>,
        "sortedAnswerIDs": <[Int]>,
      },
      // For open questions
      {
        "questionID": <Int>,
        "answer": "<String>",
      },
    ]
  } 
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
