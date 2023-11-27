package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/flights")
public class FlightController {

    private FlightRepository flightRepository;

    @Autowired
    public FlightController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

}
