import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TicketService } from '../ticket-service/ticket-service.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';
@Controller('ticket')
export class TicketControllerController {
    constructor(private ticketService:TicketService) {
        
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTickets(){
        return this.ticketService.getAllTickets();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTicketById(@Param('id') id: string){
        return this.ticketService.getTicketById(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createTicket(@Req() req, @Body() body: { eventName: string; eventDate: string; price: number }){
        const userId = req.user.id;
        return this.ticketService.createTicket(userId,body.eventName,new Date(body.eventDate),body.price);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    updateTicket(@Param('id') id: string, @Body() body: { eventName?: string; eventDate?: string; price?: number }){
        return this.ticketService.updateTicket(Number(id),body.eventName,new Date(body.eventDate),body.price);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deleteTicket(@Param('id') id: string){
        return this.ticketService.deleteTicket(Number(id));
    }

}
