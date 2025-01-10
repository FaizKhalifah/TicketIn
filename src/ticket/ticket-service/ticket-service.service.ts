import { Inject, Injectable } from '@nestjs/common';
import { DbConnection } from 'src/database/db-connection/db-connection';
@Injectable()
export class TicketServiceService {
    constructor( @Inject('DbConnection') private database:DbConnection){
    
    }

    async getAllTickets(){
        return this.database.ticket.findMany({
            include: { user: true },
          });

        
    }

    async getTicketById(id:number){
        return this.database.ticket.findUnique({
            where: { id },
            include: { user: true },
        })
    }

    async createTicket(userId:number,eventName:string,eventDate:Date,price:number){
        const data ={
            userId:userId,
            eventName:eventName,
            eventDate:eventDate,
            price:price
        }
        return this.database.ticket.create({data});
    }

    async updateTicket(id: number,  eventName?: string, eventDate?: Date, price?: number){
        const data = {
            eventName:eventName,
            eventDate:eventDate,
            price:price
        }

        return this.database.ticket.update({
            where:{id},
            data
        })
    }

    async deleteTicket(id:number){
        return this.database.ticket.delete({
            where:{id}
        })
    }
}
