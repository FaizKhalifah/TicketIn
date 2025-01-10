import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TicketService } from '../ticket-service/ticket-service.service';
@Controller('ticket')
export class TicketControllerController {
    constructor(private ticketService:TicketService) {
        
    }

    @Get()
    getAllTickets(){
        return this.ticketService.getAllTickets();
    }

    @Get(':id')
    getTicketById(@Param('id') id: string){
        return this.ticketService.getTicketById(Number(id));
    }

    @Post('create')
    createTicket(@Req() req, @Body() body: { eventName: string; eventDate: string; price: number }){
        const userId = req.user.id;
        return this.ticketService.createTicket(userId,body.eventName,new Date(body.eventDate),body.price);
    }

    @Put('update/:id')
    updateTicket(@Param('id') id: string, @Body() body: { eventName?: string; eventDate?: string; price?: number }){
        return this.ticketService.updateTicket(Number(id),body.eventName,new Date(body.eventDate),body.price);
    }

    @Delete('delete/:id')
    deleteTicket(@Param('id') id: string){
        return this.ticketService.deleteTicket(Number(id));
    }

}
