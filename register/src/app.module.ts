import { Module } from '@nestjs/common';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'node:path';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [
    ItemsModule,
    PurchasesModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: 'schema.gql',
        federation: 2,
      },
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
