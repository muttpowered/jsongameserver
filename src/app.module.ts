import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DBCacheModule } from './dbcache/dbcache.module';
import * as GraphQLJSON from 'graphql-type-json';

// Setup app from here, add other modules as needed
@Module({
  imports: [
    DatabaseModule,
    DBCacheModule,
    AuthModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({req}) => ({req}),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
  ],
})
export class AppModule { }
