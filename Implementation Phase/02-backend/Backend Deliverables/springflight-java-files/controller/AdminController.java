package com.ensf614.springflight.controller;

import com.ensf614.springflight.service.AdminService;
import com.ensf614.springflight.model.User;
import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.viewmodels.CrewView;
import com.ensf614.springflight.model.Flight;
import com.ensf614.springflight.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;
    private EmailService emailService;

    @Autowired
    public AdminController(AdminService adminService, EmailService emailService) {
        this.adminService = adminService;
        this.emailService = emailService;
    }

    @GetMapping("/users/all")
    public List<User> getAllUsers() {
        return adminService.allUsers();
    }

    @GetMapping("/aircrafts/all")
    public List<Aircraft> getAllAircrafts() {
        return adminService.allAircrafts();
    }

    @PostMapping("/aircrafts/add")
    public Aircraft addAircraft(@RequestBody Aircraft aircraft) {
        return adminService.addAircraft(aircraft);
    }
    @Transactional
    @DeleteMapping("/aircrafts/delete/{aircraftID}")
    public void deleteAircraft(@PathVariable int aircraftID) {
        adminService.deleteAircraft(aircraftID);
    }

    @GetMapping("/crewflights/all")
    public List<CrewView> getAllCrewFlights() {
        return adminService.allCrewFlights();
    }

    @GetMapping("/crewflights/flight/{flightID}")
    public List<CrewView> getCrewFlightsByFlightID(@PathVariable int flightID) {
        return adminService.allCrewFlightsOnFlight(flightID);
    }

    @PostMapping("/crewflights/add")
    public void addCrewFlights(@RequestBody CrewView crewFlights) {
        adminService.addCrewFlights(crewFlights);
    }

    @Transactional
    @DeleteMapping("/crewflights/delete/{userID}/{flightID}")
    public void deleteCrewFlights(@PathVariable int userID, @PathVariable int flightID) {
        adminService.deleteByUserIDAndFlightID(userID, flightID);
    }

    @GetMapping("crewflights/code/{code}")
    public List<CrewView> getCrewFlightsByCode(@PathVariable String code) {
        return adminService.allCrewFlightsByCode(code);
    }

    @GetMapping("creflights/all")
    public List<CrewView> getAllCrew() {
        List<User> allCrew = adminService.allUsersByRole(3);

        List<CrewView> crewViews = new ArrayList<>();

        for (User crew : allCrew) {
            CrewView crewView = new CrewView();
            crewView.setUserID(crew.getUserID());
            crewView.setName(crew.getFname() + " " + crew.getLname());
            crewViews.add(crewView);
        }
        return crewViews;
    }

    @GetMapping("/flights/{code}/{date}")
    public Optional<Flight> getFlightsByCodeAndDate(@PathVariable String code, @PathVariable String date) {
        return adminService.findByCodeAndDate(code, date);
    }

    @GetMapping("/flights/id/{id}")
    public Optional<Flight> getFlightById(@PathVariable int id) {
        return adminService.findByFlightID(id);
    }

    @GetMapping("/flights/code/{code}")
    public Optional<Flight> getFlightByCode(@PathVariable String code) {
        return adminService.findByCode(code);
    }

    @GetMapping("/flights/date/{date}")
    public List<Flight> getFlightsByDate(@PathVariable String date) {
        return adminService.findByDate(date);
    }

    @GetMapping("/flights/dateorigindestination/{date}/{origin}/{destination}")
    public List<Flight> getFlightsByDate(@PathVariable String date, @PathVariable String origin, @PathVariable String destination) {
        return adminService.findByDateAndOriginAndDestination(date, origin, destination);
    }

    @GetMapping("/flights/origindestination/{origin}/{destination}")
    public List<Flight> getFlightsByDate(@PathVariable String origin, @PathVariable String destination) {
        return adminService.findByOriginAndDestination(origin, destination);
    }

    @PostMapping("/flights/add")
    public Flight addFlight(@RequestBody Flight flight) {
        return adminService.addFlight(flight);
    }

    @PutMapping("/flights/update")
    public void updateFlight(@RequestBody Flight flight) {
        adminService.updateFlight(flight);
    }

    @Transactional
    @DeleteMapping("/flights/delete/{flightID}")
    public void deleteFlight(@PathVariable int flightID) {
        List<Ticket> deletedTickets = adminService.allTicketsOnFlight(flightID);

        for (Ticket ticket : deletedTickets) {
            emailService.ticketCancellationEmail(ticket);
        }
        adminService.deleteFlight(flightID);
    }

}
