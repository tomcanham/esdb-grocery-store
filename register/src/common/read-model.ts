import { StreamSubscription, ReadRevision } from '@eventstore/db-client';
import { StreamHandler } from './stream-handler';

export abstract class ReadModel<T> {
  private subscription: StreamSubscription;
  private subscribed: boolean;
  protected readonly store: Map<string, T> = new Map();
  protected readonly handlers: Map<string, (data: any) => void> = new Map();

  constructor(public readonly stream: StreamHandler) {}

  async subscribe(fromRevision: ReadRevision = 'start') {
    if (!this.subscribed) {
      this.subscribed = true;

      this.subscription = this.stream.client.subscribeToStream(
        `$ce-${this.stream.prefix}`,
        {
          fromRevision,
          resolveLinkTos: true,
        },
      );

      // never returns
      for await (const resolvedEvent of this.subscription) {
        const event = resolvedEvent.event;
        await this.handleEvent(event);
      }
    }
  }

  async unsubscribe() {
    if (this.subscribed) {
      this.subscribed = false;
      await this.subscription.unsubscribe();
    }
  }

  protected registerHandler(type: string, handler: (data: any) => void) {
    this.handlers.set(type, handler.bind(this));
  }

  protected async handleEvent(event: any) {
    if (this.subscribed) {
      const type = event?.type;
      const data = event?.data;

      const handler = this.handlers.get(type);
      return handler && handler(data);
    }
  }

  getAll(): T[] {
    return [...this.store.values()];
  }

  getById(id: string): T {
    return this.store.get(id);
  }
}
