package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    private FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> allFlights() { return flightRepository.findAll(); }

    public Optional<Flight> findById(String id) {
        return flightRepository.findById(id);
    }

    public Optional<Flight> findByCode(String code) { return flightRepository.findByCode(code); }

    public List<Flight> findByDate(String date) {
        return flightRepository.findByDate(date);
    }

    public List<Flight> findByDateAndOriginAndDestination(String date, String origin, String destination) {
        return flightRepository.findByDateAndOriginAndDestination(date, origin, destination);
    }

    public List<Flight> findByOriginAndDestination(String origin, String destination) {
        return flightRepository.findByOriginAndDestination(origin, destination);
    }
}
