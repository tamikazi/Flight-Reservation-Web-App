package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/flights")
public class FlightController {

    private FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.allFlights();
    }

    @GetMapping("/id/{id}")
    public Optional<Flight> getFlightById(@PathVariable String id) {
        return flightService.findById(id);
    }

    @GetMapping("/code/{code}")
    public Optional<Flight> getFlightByCode(@PathVariable String code) {
        return flightService.findByCode(code);
    }

    @GetMapping("/date/{date}")
    public List<Flight> getFlightsByDate(@PathVariable String date) {
        return flightService.findByDate(date);
    }

    @GetMapping("/dateorigindestination/{date}/{origin}/{destination}")
    public List<Flight> getFlightsByDate(@PathVariable String date, @PathVariable String origin, @PathVariable String destination) {
        return flightService.findByDateAndOriginAndDestination(date, origin, destination);
    }

    @GetMapping("/origindestination/{origin}/{destination}")
    public List<Flight> getFlightsByDate(@PathVariable String origin, @PathVariable String destination) {
        return flightService.findByOriginAndDestination(origin, destination);
    }

}
