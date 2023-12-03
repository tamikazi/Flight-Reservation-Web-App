package com.ensf614.springflight.email;

import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.FlightRepository;
import org.springframework.stereotype.Component;

@Component
public class EmailTicket implements EmailStrategy {
    private TicketRepository ticketRepository;
    private UserRepository userRepository;
    private SeatRepository seatRepository;
    private FlightRepository flightRepository;


    public EmailTicket(TicketRepository ticketRepository, UserRepository userRepository,
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
        emailBody.append("Thank you for purchasing flight tickets!\n\n");
        emailBody.append("Here are your booking details:\n");

        emailBody.append("-------------------------------------------\n");
        emailBody.append("Ticket ID: " + ticket.getTicketID() + "\n");
        emailBody.append("Seat: " + seatRepository.getById(ticket.getSeatID()).getSeatNumber() + "\n");
        emailBody.append("Flight: " + flightRepository.findByFlightID(ticket.getFlightID()).get().getCode() + "\n");
        emailBody.append("Origin: " + flightRepository.findByFlightID(ticket.getFlightID()).get().getOrigin() + "\n");
        emailBody.append("Destination: " + flightRepository.findByFlightID(ticket.getFlightID()).get().getDestination() + "\n");
        emailBody.append("Date: " + flightRepository.findByFlightID(ticket.getFlightID()).get().getDate() + "\n");
        emailBody.append("Time: " + flightRepository.findByFlightID(ticket.getFlightID()).get().getTime() + "\n");
        emailBody.append("-------------------------------------------\n");
        float cost = ticket.getCost();

        if (ticket.isInsurance()) {
            cost += 50;
        }
        emailBody.append("Total: $" + cost + "\n");
        emailBody.append("-------------------------------------------\n");
        emailBody.append("Thank you for flying with us!\n");
        return emailBody.toString();
    }
}
