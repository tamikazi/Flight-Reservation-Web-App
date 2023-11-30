package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.viewmodels.PassengerView;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
public class ManifestService {
    private TicketRepository ticketRepository;
    private FlightRepository flightRepository;
    private SeatRepository seatRepository;

    public ManifestService(TicketRepository ticketRepository,
                           FlightRepository flightRepository, SeatRepository seatRepository) {
        this.ticketRepository = ticketRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
    }

    public List<PassengerView> getPassengerManifest(String code, String date) {
        Optional<Flight> flight = flightRepository.findByCodeAndDate(code, date);
        if (flight.isPresent()) {
            List<Ticket> ticketsOnFlight = ticketRepository.findByFlightID(flight.get().getFlightID());

            List<PassengerView> passengerManifest = new ArrayList<PassengerView>();
            for (Ticket ticket : ticketsOnFlight) {
                PassengerView passenger = new PassengerView();
                passenger.setName(ticket.getName());
                passenger.setSeatNumber(seatRepository.findBySeatID(ticket.getSeatID()).getSeatNumber());
                passengerManifest.add(passenger);
            }

            return passengerManifest;

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found");
        }
    }
}
