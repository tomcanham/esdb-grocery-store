import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Purchase' })
export class Purchase {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  wasRefunded?: boolean;
}
