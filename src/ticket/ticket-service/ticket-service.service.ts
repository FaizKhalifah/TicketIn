import { Inject, Injectable } from '@nestjs/common';
import { DbConnection } from 'src/database/db-connection/db-connection';
@Injectable()
export class TicketServiceService {
    constructor( @Inject('DbConnection') private database:DbConnection){
    
    }

    async getAllTickets(){
        
    }

    async getTicketById(){

    }

    async createTicket(){

    }

}
