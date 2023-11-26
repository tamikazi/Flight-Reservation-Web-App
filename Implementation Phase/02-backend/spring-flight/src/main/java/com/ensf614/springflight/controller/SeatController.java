package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.repository.AircraftRepository;
import com.ensf614.springflight.repository.FlightRepository;
import com.ensf614.springflight.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/seats")
public class SeatController {

    private SeatService seatService;

    @Autowired
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.allSeats();
    }

    @GetMapping("/id/{id}")
    public Seat getSeatById(@PathVariable int id) {
        return seatService.seatByID(id);
    }
    @GetMapping("/aircraftid/{id}")
    public List<Seat> getSeatByAircraftId(@PathVariable int id) {
        return seatService.allSeatsOnAircraft(id);
    }

    @GetMapping("/flightid/{id}")
    public List<Seat> getSeatByFlightId(@PathVariable int id) {
        return seatService.allSeatsOnFlight(id);
    }

    @GetMapping("/bookedseats/{id}")
    public List<Seat> getBookedSeatsByFlightId(@PathVariable int id) {
        return seatService.allBookedSeatsOnFlight(id);
    }
}
