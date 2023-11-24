package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/tickets")
public class TicketController {
    private TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/flightid/{id}")
    public List<Ticket> getTicketByFlightID(@PathVariable int id) {
        return ticketService.allTicketsOnFlight(id);
    }
    @GetMapping("/userid/{id}")
    public List<Ticket> getTicketByUserID(@PathVariable int id) {
        return ticketService.allTicketsOnUser(id);
    }

    @GetMapping("/userflights/{userID}/{ticketID}")
    public List<Ticket> getTicketByTicketIDAndUserID(@PathVariable int userID, @PathVariable int ticketID) {
        return ticketService.ticketsOnTicketIDAndUserID(ticketID, userID);
    }
}
