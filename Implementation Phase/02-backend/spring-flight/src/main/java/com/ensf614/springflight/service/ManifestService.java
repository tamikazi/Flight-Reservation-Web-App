package com.ensf614.springflight.service;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;
import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.repository.SeatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
public class ManifestService {
    private UserRepository userRepository;
    private TicketRepository ticketRepository;
    private FlightRepository flightRepository;
    private SeatRepository seatRepository;

    public ManifestService(UserRepository userRepository, TicketRepository ticketRepository,
                           FlightRepository flightRepository, SeatRepository seatRepository) {
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
    }

    public List<Object[]> getPassengerManifest(String code, String date) {
        Optional<Flight> flight = flightRepository.findByCodeAndDate(code, date);
        if (flight.isPresent()) {
            List<Ticket> ticketsOnFlight = ticketRepository.findByFlightID(flight.get().getFlightID());

            List<Object[]> passengerManifest = new ArrayList<Object[]>();
            for (Ticket ticket : ticketsOnFlight) {
                User passenger = userRepository.findByUserID(ticket.getUserID());
                Seat currentSeat = seatRepository.findBySeatID(ticket.getSeatID());
                Object[] passengerInfo = {passenger.getFname(), passenger.getLname(), currentSeat.getSeatNumber()};
                passengerManifest.add(passengerInfo);
            }

            return passengerManifest;

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found");
        }
    }
}
