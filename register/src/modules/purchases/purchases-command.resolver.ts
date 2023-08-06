import { CreatePurchaseCommand } from './commands/create-purchase.command';
import { PurchasesService } from './purchases.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Purchase } from './types/purchase.type';

@Resolver(() => Purchase)
export class PurchasesCommandResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Mutation(() => String)
  async refundPurchase(@Args('id') id: string): Promise<string> {
    await this.purchasesService.refundPurchase({ id });

    return id;
  }

  @Mutation(() => Boolean)
  async createPurchase(
    @Args('req') req: CreatePurchaseCommand,
  ): Promise<boolean> {
    await this.purchasesService.createPurchase(req);

    return true;
  }
}
