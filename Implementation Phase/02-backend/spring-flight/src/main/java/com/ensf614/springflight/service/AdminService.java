package com.ensf614.springflight.service;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.repository.AircraftRepository;
import com.ensf614.springflight.model.CrewFlights;
import com.ensf614.springflight.repository.CrewFlightsRepository;
import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private UserRepository userRepository;
    private AircraftRepository aircraftRepository;
    private CrewFlightsRepository crewFlightsRepository;
    private FlightRepository flightRepository;

    public AdminService(UserRepository userRepository, AircraftRepository aircraftRepository,
                        CrewFlightsRepository crewFlightsRepository, FlightRepository flightRepository) {
        this.userRepository = userRepository;
        this.aircraftRepository = aircraftRepository;
        this.crewFlightsRepository = crewFlightsRepository;
        this.flightRepository = flightRepository;
    }

    public List<User> allUsers() {
            return userRepository.findAll();
    }
    public List<Aircraft> allAircrafts() {
            return aircraftRepository.findAll();
    }

    public Aircraft addAircraft(Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    public void deleteAircraft(int aircraftID) {
        aircraftRepository.deleteByAircraftID(aircraftID);
    }

    public List<CrewFlights> allCrewFlights() {
        return crewFlightsRepository.findAll();
    }

    public CrewFlights addCrewFlights(CrewFlights crewFlights) {
        return crewFlightsRepository.save(crewFlights);
    }
    public Optional<Flight> findByFlightID(int id) {
        return flightRepository.findById(id);
    }
    public Optional<Flight> findByCode(String code) {
        return flightRepository.findByCode(code);
    }
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
