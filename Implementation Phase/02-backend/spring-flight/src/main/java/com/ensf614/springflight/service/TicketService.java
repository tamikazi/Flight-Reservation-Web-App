package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.viewmodels.TicketView;
import com.ensf614.springflight.viewmodels.BookingView;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketService {

    private TicketRepository ticketRepository;
    private UserRepository userRepository;

    private SeatRepository seatRepository;

    private FlightRepository flightRepository;


    public TicketService(TicketRepository ticketRepository, UserRepository userRepository,
                         SeatRepository seatRepository, FlightRepository flightRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.seatRepository = seatRepository;
        this.flightRepository = flightRepository;
    }

    public List<Ticket> allTickets() {
        return ticketRepository.findAll();
    }

    public Ticket ticketByID(int ticketID) {
        return ticketRepository.findByTicketID(ticketID);
    }
    public List<Ticket> allTicketsOnFlight(int flightID) { return ticketRepository.findByFlightID(flightID); }

    public List<BookingView> allTicketsOnUser(int userID) {
        List <Ticket> userTickets = ticketRepository.findByUserID(userID);

        List<BookingView> userBookings = new ArrayList<BookingView>();

        for (Ticket ticket : userTickets) {
            BookingView currentBooking = new BookingView();
            currentBooking.setTicketID(ticket.getTicketID());
            currentBooking.setCode(flightRepository.findByFlightID(ticket.getFlightID()).getCode());
            currentBooking.setOrigin(flightRepository.findByFlightID(ticket.getFlightID()).getOrigin());
            currentBooking.setDestination(flightRepository.findByFlightID(ticket.getFlightID()).getDestination());
            currentBooking.setDate(flightRepository.findByFlightID(ticket.getFlightID()).getDate());
            currentBooking.setTime(flightRepository.findByFlightID(ticket.getFlightID()).getTime());
            currentBooking.setSeatNumber(seatRepository.findBySeatID(ticket.getSeatID()).getSeatNumber());
            currentBooking.setName(ticket.getName());
            currentBooking.setInsurance(ticket.isInsurance());
            userBookings.add(currentBooking);
        }


        return userBookings;
    }

    public List<BookingView> ticketsOnTicketIDAndName(int ticketID, String name) {

        List<Ticket> tickets = ticketRepository.findByTicketIDAndName(ticketID, name);

        if (tickets.isEmpty()) {
            throw new RuntimeException("No tickets found");
        }
        else {
            List<BookingView> bookings = new ArrayList<BookingView>();

            for (Ticket ticket : tickets) {
                BookingView currentBooking = new BookingView();
                currentBooking.setTicketID(ticket.getTicketID());
                currentBooking.setCode(flightRepository.findByFlightID(ticket.getFlightID()).getCode());
                currentBooking.setOrigin(flightRepository.findByFlightID(ticket.getFlightID()).getOrigin());
                currentBooking.setDestination(flightRepository.findByFlightID(ticket.getFlightID()).getDestination());
                currentBooking.setDate(flightRepository.findByFlightID(ticket.getFlightID()).getDate());
                currentBooking.setTime(flightRepository.findByFlightID(ticket.getFlightID()).getTime());
                currentBooking.setSeatNumber(seatRepository.findBySeatID(ticket.getSeatID()).getSeatNumber());
                currentBooking.setName(ticket.getName());
                currentBooking.setInsurance(ticket.isInsurance());
                bookings.add(currentBooking);
            }

            return bookings;

        }
    }

    public List<Ticket> ticketsOnFlightIDAndUserID(int flightID, int userID) {
        return ticketRepository.findByFlightIDAndUserID(flightID, userID);
    }

    public Ticket addTicket(TicketView ticket) {
        Ticket newTicket = new Ticket();
        newTicket.setFlightID(ticket.getFlightID());
        newTicket.setUserID(ticket.getUserID());
        newTicket.setSeatID(ticket.getSeatID());
        newTicket.setName(ticket.getName());
        newTicket.setCost(ticket.getPrice());
        newTicket.setInsurance(ticket.isInsurance());
        return ticketRepository.save(newTicket);
    }

    public void deleteTicket(int ticketID) {
        ticketRepository.deleteByTicketID(ticketID);
    }

}
