import { Module } from '@nestjs/common';
import { ItemsResolver } from './items.resolver';

@Module({
  imports: [],
  providers: [ItemsResolver],
})
export class ItemsModule {}
