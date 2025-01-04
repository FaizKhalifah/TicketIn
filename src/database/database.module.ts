import { Module } from '@nestjs/common';
import { DbConnection } from './db-connection/db-connection';

@Module({
  providers: [{
    provide:'DbConnection',
    useFactory:()=>{
      const dbConnection = new DbConnection;
      return dbConnection;
    }
  }
    
  ]
})
export class DatabaseModule {}
