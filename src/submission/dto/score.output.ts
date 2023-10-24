import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Score {
  @Field((type) => Int, { nullable: false })
  points: number;
}
