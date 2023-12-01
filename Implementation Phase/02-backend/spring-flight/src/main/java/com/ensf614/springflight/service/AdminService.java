package com.ensf614.springflight.service;

import com.ensf614.springflight.model.*;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.repository.AircraftRepository;
import com.ensf614.springflight.viewmodels.CrewView;
import com.ensf614.springflight.repository.CrewFlightsRepository;
import com.ensf614.springflight.repository.FlightRepository;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
    private TicketRepository ticketRepository;

    public AdminService(UserRepository userRepository, AircraftRepository aircraftRepository,
                        CrewFlightsRepository crewFlightsRepository, FlightRepository flightRepository,
                        SeatRepository seatRepository, TicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.aircraftRepository = aircraftRepository;
        this.crewFlightsRepository = crewFlightsRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
        this.ticketRepository = ticketRepository;
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

    public List<User> allUsersByCard(boolean card) {
        return userRepository.findByCard(card);
    }

    public Aircraft addAircraft(Aircraft aircraft) {
        Aircraft newAircraft = aircraftRepository.save(aircraft);
        generateSeatsForAircraft(aircraft);
        return newAircraft;
    }

    private void generateSeatsForAircraft(Aircraft aircraft) {

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

    public List<CrewView> allCrewFlights() {
        List<CrewFlights> allCrewFlights = crewFlightsRepository.findAll();
        List<CrewView> allCrew = new ArrayList<>();
        for (CrewFlights crew : allCrewFlights) {
            CrewView crewView = new CrewView();
            crewView.setUserID(crew.getUserID());
            crewView.setFlightID(crew.getFlightID());
            crewView.setName(userRepository.findByUserID(crew.getCrewID()).getFname() + " " + userRepository.findByUserID(crew.getCrewID()).getLname());
            allCrew.add(crewView);
        }

        return allCrew;
    }

    public void addCrewFlights(CrewView crewFlights) {
        CrewFlights newCrew = new CrewFlights();
        newCrew.setUserID(crewFlights.getUserID());
        newCrew.setFlightID(crewFlights.getFlightID());
        crewFlightsRepository.save(newCrew);
    }

    public List<CrewView> allCrewFlightsOnFlight(int flightID) {
        List<CrewFlights> flightCrews = crewFlightsRepository.findByFlightID(flightID);

        List<CrewView> crewViews = new ArrayList<>();

        for (CrewFlights crew : flightCrews) {
            CrewView crewView = new CrewView();
            crewView.setUserID(crew.getUserID());
            crewView.setFlightID(crew.getFlightID());
            crewView.setName(userRepository.findByUserID(crew.getCrewID()).getFname() + " " + userRepository.findByUserID(crew.getCrewID()).getLname());
            crewViews.add(crewView);
        }

        return crewViews;
    }

    public void deleteByUserIDAndFlightID(int userID, int flightID) {
        crewFlightsRepository.deleteByUserIDAndFlightID(userID, flightID);
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

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public void updateFlight(Flight flight) {
        int flightID = flight.getFlightID();

        Optional<Flight> flightToUpdate = flightRepository.findById(flightID);
        if (flightToUpdate.isPresent()) {
            Flight updatedFlight = flightToUpdate.get();
            updatedFlight.setCode(flight.getCode());
            updatedFlight.setOrigin(flight.getOrigin());
            updatedFlight.setDestination(flight.getDestination());
            updatedFlight.setDate(flight.getDate());
            updatedFlight.setTime(flight.getTime());
            updatedFlight.setAircraftID(flight.getAircraftID());
            updatedFlight.setBasePrice(flight.getBasePrice());
            flightRepository.save(updatedFlight);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight with ID: " + flightID + " not found.");
        }
    }

    public void deleteFlight(int flightID) {
        flightRepository.deleteByFlightID(flightID);
    }

    public List<Ticket> allTicketsOnFlight(int flightID) {
        return ticketRepository.findByFlightID(flightID);
    }

}
