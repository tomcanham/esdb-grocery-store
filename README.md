# esdb-grocery-store

A sample "grocery store" app using event sourcing (through ESDB) and federated GraphQL (through NestJS)

The event sourcing code is stolen from the ESDB docs (and heavily edited). Thew GraphQL code is mostly from the NestJS docs.

Sample patterns for "Nest-ifying" the ESDB code are included.

Note that initial work for CQRS is done; next steps involve moving the mutations to a separate microservice to demonstrate true command/query separation.

Note also that at this point (2023-08-06) the frontend app is just a bare Next.js app; it is not "wired up" to the backend through the GraphQL gateway yet.
