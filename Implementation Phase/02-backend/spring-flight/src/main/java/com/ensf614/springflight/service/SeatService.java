package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.viewmodels.SeatView;
import org.springframework.stereotype.Service;
import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.TicketRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SeatService {
    private SeatRepository seatRepository;
    private FlightRepository flightRepository;
    private TicketRepository ticketRepository;

    public SeatService(SeatRepository seatRepository, FlightRepository flightRepository, TicketRepository ticketRepository) {
        this.seatRepository = seatRepository;
        this.flightRepository = flightRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<Seat> allSeats() {
        return seatRepository.findAll();
    }

    public Seat seatById(int id) {
        return seatRepository.findBySeatID(id);
    }

    public List<Seat> seatByAircraftId(int id) {
        return seatRepository.findByAircraftID(id);
    }

    public List<SeatView> seatsOnFlight(int flightID) {

        Optional<Flight> currentFlight = flightRepository.findById(flightID);
        float basePrice = currentFlight.get().getBasePrice();
        List<Seat> seatsOnFlight = seatRepository.findByFlightID(flightID);
        List<Seat> bookedSeatsOnFlight = seatRepository.findBookedSeats(flightID);
        List<SeatView> currentSeats = new ArrayList<SeatView>();

        for (Seat seat : seatsOnFlight) {
            SeatView currentSeat = new SeatView();
            currentSeat.setSeatID(seat.getSeatID());
            currentSeat.setSeatNumber(seat.getSeatNumber());

            if ("Business".equals(seat.getSeatClass())) {
                currentSeat.setPrice(2f * basePrice);
            }
            else if ("Comfort".equals(seat.getSeatClass())) {
                currentSeat.setPrice(1.5f * basePrice);
            }
            else {
                currentSeat.setPrice(basePrice);
            }
            boolean available = true;
            for (Seat bookedSeat : bookedSeatsOnFlight) {
                if (bookedSeat.getSeatID() == seat.getSeatID()) {
                    available = false;
                    break;
                }
            }
            currentSeat.setSeatClass(seat.getSeatClass());
            currentSeat.setAvailable(available);
            currentSeats.add(currentSeat);
        }

        return currentSeats;
    }

}
