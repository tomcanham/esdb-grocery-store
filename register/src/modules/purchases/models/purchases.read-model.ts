import { Injectable, Logger } from '@nestjs/common';
import { ReadModel } from '../../../common/read-model';
import { StreamHandler } from '../../../common/stream-handler';
import { PurchaseEventTypes } from '../enums/purchase-event-types.enum';
import { PurchaseRefund } from '../types/purchase-refund.type';
import { Purchase } from '../types/purchase.type';
import { client as eventStore } from '../../../event-store';

@Injectable()
export class PurchasesReadModel extends ReadModel<Purchase> {
  private readonly logger: Logger = new Logger('PurchaseReadModel');

  constructor() {
    super(new StreamHandler('purchase', eventStore));

    this.registerHandler(
      PurchaseEventTypes.PRODUCT_PURCHASED,
      this.handleProductPurchased,
    );

    this.registerHandler(
      PurchaseEventTypes.PRODUCT_REFUNDED,
      this.handleProductRefunded,
    );
  }

  private handleProductPurchased(purchase: Purchase) {
    this.store.set(purchase.id, purchase);
  }

  private handleProductRefunded(refund: PurchaseRefund) {
    this.store.get(refund.id).wasRefunded = true;
  }
}
