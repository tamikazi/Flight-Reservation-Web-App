package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.service.TicketService;
import com.ensf614.springflight.viewmodels.BookingView;
import com.ensf614.springflight.viewmodels.PaymentView;
import com.ensf614.springflight.viewmodels.TicketView;
import com.ensf614.springflight.service.EmailService;
import com.ensf614.springflight.service.PaymentService;
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

    private PaymentService paymentService;

    @Autowired
    public TicketController(TicketService ticketService, EmailService emailService,
                            PaymentService paymentService) {
        this.ticketService = ticketService;
        this.emailService = emailService;
        this.paymentService = paymentService;
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
        PaymentView refund = new PaymentView();

        Ticket deletedTicket = ticketService.ticketByID(ticketID);

        refund.setUserID(deletedTicket.getUserID());
        refund.setPayDate(java.time.LocalDate.now().toString());

        float refundAmount = deletedTicket.getCost() * -1;

//        if (ticketService.ticketByID(ticketID).isInsurance()) {
//            refundAmount -= 50;
//            deletedTicket.setCost(refundAmount);
//        }

        refund.setAmount(refundAmount);
        paymentService.addPayment(refund);
        emailService.ticketCancellationEmail(ticketService.ticketByID(ticketID));
        ticketService.deleteTicket(ticketID);
    }
}
