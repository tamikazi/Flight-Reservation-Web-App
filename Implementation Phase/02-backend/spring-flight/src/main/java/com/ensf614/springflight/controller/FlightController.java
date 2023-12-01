package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/flights")
public class FlightController {

    private FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) { this.flightService = flightService; }

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.allFlights();
    }

    @GetMapping("/{date}/{origin}/{destination}")
    public List<Flight> getFlightsByDateAndOriginAndDestination(@PathVariable String date, @PathVariable String origin, @PathVariable String destination) {
        return flightService.findByDateAndOriginAndDestination(date, origin, destination);
    }

    @GetMapping("/{origin}/{destination}")
    public List<Flight> getFlightsByOriginAndDestination(@PathVariable String origin, @PathVariable String destination) {
        return flightService.findByOriginAndDestination(origin, destination);
    }

}
