import { Module } from '@nestjs/common';
import { DbConnection } from './db-connection/db-connection';

@Module({
  providers: [DbConnection]
})
export class DatabaseModule {}
