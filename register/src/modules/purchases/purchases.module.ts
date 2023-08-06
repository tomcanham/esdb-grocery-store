import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesCommandResolver } from './purchases-command.resolver';
import { PurchasesReadModel } from './models/purchases.read-model';
import { PurchasesQueryResolver } from './purchases-query.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PurchasesReadModel,
    PurchasesService,
    PurchasesQueryResolver,
    PurchasesCommandResolver,
  ],
})
export class PurchasesModule {}
