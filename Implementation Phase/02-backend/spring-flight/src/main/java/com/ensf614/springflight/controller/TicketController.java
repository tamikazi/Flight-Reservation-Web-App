package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.service.TicketService;
import com.ensf614.springflight.viewmodels.BookingView;
import com.ensf614.springflight.viewmodels.TicketView;
import com.ensf614.springflight.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/tickets")
public class TicketController {
    private TicketService ticketService;
    private EmailService emailService;

    @Autowired
    public TicketController(TicketService ticketService, EmailService emailService) {
        this.ticketService = ticketService;
        this.emailService = emailService;
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.allTickets();
    }

    @GetMapping("/id/{id}")
    public Ticket getTicketById(@PathVariable int id) {
        return ticketService.ticketByID(id);
    }
    @GetMapping("/flightid/{id}")
    public List<Ticket> getTicketByFlightID(@PathVariable int id) {
        return ticketService.allTicketsOnFlight(id);
    }
    @GetMapping("/userid/{id}")
    public List<BookingView> getTicketByUserID(@PathVariable int id) {
        return ticketService.allTicketsOnUser(id);
    }

    @GetMapping("/userflights/{ticketID}/{name}")
    public List<BookingView> getTicketByTicketIDAndName(@PathVariable int ticketID, @PathVariable String name) {

        return ticketService.ticketsOnTicketIDAndName(ticketID, name);
    }


    @PostMapping("/add")
    public void addTicket(@RequestBody List<TicketView> tickets) {

        for (TicketView ticket : tickets) {
            Ticket newTicket = ticketService.addTicket(ticket);
            emailService.ticketEmail(newTicket);
        }
    }

    @Transactional
    @DeleteMapping("/delete/{ticketID}")
    public void deleteTicket(@PathVariable int ticketID) {
        emailService.ticketCancellationEmail(ticketService.ticketByID(ticketID));
        ticketService.deleteTicket(ticketID);
    }
}
