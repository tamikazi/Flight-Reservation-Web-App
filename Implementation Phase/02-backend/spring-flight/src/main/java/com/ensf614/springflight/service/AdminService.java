package com.ensf614.springflight.service;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.repository.AircraftRepository;
import com.ensf614.springflight.model.CrewFlights;
import com.ensf614.springflight.repository.CrewFlightsRepository;
import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.repository.FlightRepository;
import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private UserRepository userRepository;
    private AircraftRepository aircraftRepository;
    private CrewFlightsRepository crewFlightsRepository;
    private FlightRepository flightRepository;
    private SeatRepository seatRepository;

    public AdminService(UserRepository userRepository, AircraftRepository aircraftRepository,
                        CrewFlightsRepository crewFlightsRepository, FlightRepository flightRepository,
                        SeatRepository seatRepository) {
        this.userRepository = userRepository;
        this.aircraftRepository = aircraftRepository;
        this.crewFlightsRepository = crewFlightsRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
    }

    public List<User> allUsers() {
            return userRepository.findAll();
    }
    public List<Aircraft> allAircrafts() {
            return aircraftRepository.findAll();
    }

    public User userByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> allUsersByRole(int roleID) {
        return userRepository.findByRoleID(roleID);
    }

    public List<User> allUsersByMember(boolean member) {
        return userRepository.findByMember(member);
    }

    public Aircraft addAircraft(Aircraft aircraft) {
        Aircraft newAircraft = aircraftRepository.save(aircraft);
        generateSeatsForAircraft(aircraft);
        return newAircraft;
    }

    public void generateSeatsForAircraft(Aircraft aircraft) {

        if (aircraft != null) {
            int rows = aircraft.getNumRows();
            int cols = aircraft.getNumCols();
            int aircraftID = aircraft.getAircraftID();

            List<Seat> newSeats = new ArrayList<>();

            for (int i = 0; i <= rows; i++) {
                char row = (char) ('A' + i);
                for (int j = 0; j <= cols; j++) {
                    String seatNumber = row + Integer.toString(j + 1);
                    String seatClass = determineSeatClass(i);
                    Seat seat = new Seat();
                    seat.setAircraftID(aircraftID);
                    seat.setSeatNumber(seatNumber);
                    seat.setSeatClass(seatClass);
                    newSeats.add(seat);
                }
            }

            seatRepository.saveAll(newSeats);
        }

    }

    private String determineSeatClass(int row) {
        if (row == 1) {
            return "Business";
        } else if (row == 2) {
            return "Comfort";
        } else {
            return "Economy";
        }
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
