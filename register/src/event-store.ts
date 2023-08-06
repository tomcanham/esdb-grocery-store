import { EventStoreDBClient, FORWARDS, START } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString(
  'esdb://localhost:2113?tls=false',
);

export { client };
