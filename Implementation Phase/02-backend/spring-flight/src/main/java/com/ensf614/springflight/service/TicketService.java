package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.viewmodels.TicketView;
import com.ensf614.springflight.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketService {

    private TicketRepository ticketRepository;
    private UserRepository userRepository;

    private SeatRepository seatRepository;


    public TicketService(TicketRepository ticketRepository, UserRepository userRepository,
                         SeatRepository seatRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.seatRepository = seatRepository;
    }

    public List<Ticket> allTickets() {
        return ticketRepository.findAll();
    }

    public Ticket ticketByID(int ticketID) {
        return ticketRepository.findByTicketID(ticketID);
    }
    public List<Ticket> allTicketsOnFlight(int flightID) { return ticketRepository.findByFlightID(flightID); }

    public List<TicketView> allTicketsOnUser(int userID) {
        List <Ticket> userTickets = ticketRepository.findByUserID(userID);

        List<TicketView> userTicketsView = new ArrayList<TicketView>();
        Seat userSeats = seatRepository.findBySeatID(userID);

        for (Ticket ticket : userTickets) {
            TicketView currentTicket = new TicketView();
            currentTicket.setTicketID(ticket.getTicketID());
            currentTicket.setFlightID(ticket.getFlightID());
            currentTicket.setUserID(ticket.getUserID());
            currentTicket.setSeatNumber(seatRepository.findBySeatID(ticket.getSeatID()).getSeatNumber());
            currentTicket.setFname(userRepository.findByUserID(ticket.getUserID()).getFname());
            currentTicket.setLname(userRepository.findByUserID(ticket.getUserID()).getLname());
            currentTicket.setPrice(ticket.getCost());
            currentTicket.setInsurance(ticket.isInsurance());
            userTicketsView.add(currentTicket);
        }


        return userTicketsView;
    }

    public Ticket ticketsOnTicketIDAndUserID(int ticketID, int userID) {
        return ticketRepository.findByTicketIDAndUserID(ticketID, userID);
    }

    public List<Ticket> ticketsOnFlightIDAndUserID(int flightID, int userID) {
        return ticketRepository.findByFlightIDAndUserID(flightID, userID);
    }

    public Ticket addTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void deleteTicket(int ticketID) {
        ticketRepository.deleteByTicketID(ticketID);
    }

}
