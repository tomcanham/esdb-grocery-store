import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { RefundPurchaseCommand } from '../commands/refund-purchase.command';
import { PurchaseEventTypes } from '../enums/purchase-event-types.enum';
import { PurchasesReadModel } from './purchases.read-model';
import { StreamHandler } from '../../../common/stream-handler';
import { CreatePurchaseCommand } from '../commands/create-purchase.command';

@Injectable()
export class PurchasesWriteModel {
  private readonly logger = new Logger(PurchasesWriteModel.name);
  private readonly stream: StreamHandler;

  constructor(private readonly readModel: PurchasesReadModel) {
    this.stream = readModel.stream;
  }

  async createPurchase(cmd: CreatePurchaseCommand): Promise<bigint> {
    const id = uuid();
    const data = { ...cmd, id };

    return this.stream.appendEvent(
      id,
      PurchaseEventTypes.PRODUCT_PURCHASED,
      data,
    );
  }

  async refundPurchase(cmd: RefundPurchaseCommand): Promise<bigint> {
    const { id } = cmd;

    // make sure it exists first
    const purchase = this.readModel.getById(id);
    if (!purchase) {
      throw new NotFoundException();
    }

    const data = { id };

    return this.stream.appendEvent(
      id,
      PurchaseEventTypes.PRODUCT_REFUNDED,
      data,
    );
  }
}
