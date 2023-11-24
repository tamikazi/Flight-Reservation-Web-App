package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> allTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> allTicketsOnFlight(int flightID) { return ticketRepository.findByFlightID(flightID); }

    public List<Ticket> allTicketsOnUser(int userID) {
        return ticketRepository.findByUserID(userID);
    }

    public List<Ticket> ticketsOnTicketIDAndUserID(int ticketID, int userID) {
        return ticketRepository.findByTicketIDAndUserID(ticketID, userID);
    }

}
