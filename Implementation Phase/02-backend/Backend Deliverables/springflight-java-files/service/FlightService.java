package com.ensf614.springflight.service;

import org.springframework.stereotype.Service;
import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;

import java.util.List;

@Service
public class FlightService {
    private FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> allFlights() {
        return flightRepository.findAll();
    }
    public List<Flight> findByDateAndOriginAndDestination(String date, String origin, String destination) {
        return flightRepository.findByDateAndOriginAndDestination(date, origin, destination);
    }

    public List<Flight> findByOriginAndDestination(String origin, String destination) {
        return flightRepository.findByOriginAndDestination(origin, destination);
    }
}
