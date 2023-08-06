import { Args, Query, Resolver } from '@nestjs/graphql';
import { Item } from './models/item.model';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Item)
export class ItemsResolver {
  @Query(() => Item, { nullable: true })
  async item(@Args('id') id: string): Promise<Item> {
    const item = new Item();
    item.id = uuid();
    item.name = 'Item 1';
    item.price = 9.99;
    if (!item) {
      throw new NotFoundException(id);
    }
    return item;
  }
}
