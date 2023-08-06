import { Inject, Injectable } from '@nestjs/common';
import { Purchase } from './types/purchase.type';
import { CreatePurchaseCommand } from './commands/create-purchase.command';
import { RefundPurchaseCommand } from './commands/refund-purchase.command';
import { PurchasesReadModel } from './models/purchases.read-model';
import { PurchasesWriteModel } from './models/purchases.write-model';

@Injectable()
export class PurchasesService {
  private readonly writeModel: PurchasesWriteModel;

  constructor(
    @Inject(PurchasesReadModel)
    private readonly readModel: PurchasesReadModel,
  ) {
    this.writeModel = new PurchasesWriteModel(readModel);
  }

  async onModuleInit() {
    this.readModel.subscribe();
  }

  async onModuleDestroy() {
    this.readModel.unsubscribe();
  }

  // command handlers
  async createPurchase(cmd: CreatePurchaseCommand): Promise<bigint> {
    return this.writeModel.createPurchase(cmd);
  }

  async refundPurchase(cmd: RefundPurchaseCommand): Promise<bigint> {
    return this.writeModel.refundPurchase(cmd);
  }

  // query handlers
  async getAllPurchases(): Promise<Purchase[]> {
    return this.readModel.getAll();
  }

  async getPurchaseById(id: string): Promise<Purchase> {
    return this.readModel.getById(id);
  }

  async getPurchasesFiltered(
    filter: (p: Purchase) => boolean,
  ): Promise<Purchase[]> {
    return this.readModel.getAll().filter(filter);
  }
}
