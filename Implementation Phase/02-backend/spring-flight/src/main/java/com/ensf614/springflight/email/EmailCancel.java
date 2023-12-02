package com.ensf614.springflight.email;

import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.FlightRepository;
import org.springframework.stereotype.Component;

@Component
public class EmailCancel implements EmailStrategy{

    private TicketRepository ticketRepository;
    private UserRepository userRepository;
    private SeatRepository seatRepository;
    private FlightRepository flightRepository;

    public EmailCancel(TicketRepository ticketRepository, UserRepository userRepository,
                       SeatRepository seatRepository, FlightRepository flightRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.seatRepository = seatRepository;
        this.flightRepository = flightRepository;
    }

    @Override
    public String generateContent(Ticket ticket) {
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Dear " + ticket.getName() + ",\n\n");
        emailBody.append("Your flight has been cancelled.\n\n");
        emailBody.append("Here are your booking details:\n");

        emailBody.append("-------------------------------------------\n");
        emailBody.append("Ticket ID: " + ticket.getTicketID() + "\n");
        emailBody.append("Seat: " + seatRepository.getById(ticket.getSeatID()).getSeatNumber() + "\n");
        emailBody.append("Flight: " + flightRepository.findByFlightID(ticket.getFlightID()).getCode() + "\n");
        emailBody.append("Origin: " + flightRepository.findByFlightID(ticket.getFlightID()).getOrigin() + "\n");
        emailBody.append("Destination: " + flightRepository.findByFlightID(ticket.getFlightID()).getDestination() + "\n");
        emailBody.append("Date: " + flightRepository.findByFlightID(ticket.getFlightID()).getDate() + "\n");
        emailBody.append("Time: " + flightRepository.findByFlightID(ticket.getFlightID()).getTime() + "\n");
        emailBody.append("-------------------------------------------\n");
        emailBody.append("Total Amount Refunded: $" + ticket.getCost() + "\n");
        emailBody.append("-------------------------------------------\n");
        return emailBody.toString();
    }
}
