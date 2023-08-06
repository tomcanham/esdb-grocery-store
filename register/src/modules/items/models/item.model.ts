import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

@ObjectType({ description: 'Inventory item' })
export class Item {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;
}
