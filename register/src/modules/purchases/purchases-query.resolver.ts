import { Purchase } from './types/purchase.type';
import { PurchasesService } from './purchases.service';
import { Args, Query, ResolveReference, Resolver } from '@nestjs/graphql';

@Resolver(() => Purchase)
export class PurchasesQueryResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Query(() => Purchase, { nullable: true })
  async purchase(@Args('id') id: string): Promise<Purchase> {
    return this.purchasesService.getPurchaseById(id);
  }

  @Query(() => [Purchase])
  async purchases(): Promise<Purchase[]> {
    return this.purchasesService.getAllPurchases();
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Purchase> {
    return this.purchasesService.getPurchaseById(reference.id);
  }
}
