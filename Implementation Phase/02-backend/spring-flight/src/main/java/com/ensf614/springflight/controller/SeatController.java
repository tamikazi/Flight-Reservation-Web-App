package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/seats")
public class SeatController {

    private SeatRepository seatRepository;

    @Autowired
    public SeatController(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    @GetMapping("/id/{id}")
    public Seat getSeatById(@PathVariable int id) {
        return seatRepository.findBySeatID(id);
    }
    @GetMapping("/aircraftid/{id}")
    public List<Seat> getSeatByAircraftId(@PathVariable int id) {
        return seatRepository.findByAircraftID(id);
    }

    @GetMapping("/flightid/{id}")
    public List<Seat> getSeatByFlightId(@PathVariable int id) {
        return seatRepository.findByFlightID(id);
    }

    @GetMapping("/bookedseats/{id}")
    public List<Seat> getBookedSeatsByFlightId(@PathVariable int id) {
        return seatRepository.findBookedSeats(id);
    }
}
