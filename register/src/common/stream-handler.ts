import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client';

export class StreamHandler {
  constructor(
    public readonly prefix: string,
    public readonly client: EventStoreDBClient,
  ) {}

  public getStream(id: string): string {
    return `${this.prefix}-${id}`;
  }

  public async appendEvents(
    id: string,
    events: any[],
    expectedRevision?: bigint,
  ): Promise<bigint> {
    const { nextExpectedRevision } = await this.client.appendToStream(
      this.getStream(id),
      events,
      {
        expectedRevision: expectedRevision || 'any',
      },
    );

    return nextExpectedRevision;
  }

  public async appendEvent(
    id: string,
    type: string,
    event: any,
    expectedRevision?: bigint,
  ): Promise<bigint> {
    const rawEvent = {
      type,
      data: event,
    };
    const eventToSend = jsonEvent(rawEvent);

    return this.appendEvents(id, [eventToSend], expectedRevision);
  }
}
