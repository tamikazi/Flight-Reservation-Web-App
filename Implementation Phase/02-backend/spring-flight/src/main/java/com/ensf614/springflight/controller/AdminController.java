package com.ensf614.springflight.controller;

import com.ensf614.springflight.service.AdminService;
import com.ensf614.springflight.model.User;
import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.model.CrewFlights;
import com.ensf614.springflight.model.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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
    public List<CrewFlights> getAllCrewFlights() {
        return adminService.allCrewFlights();
    }

    @PostMapping("/crewflights/add")
    public CrewFlights addCrewFlights(@RequestBody CrewFlights crewFlights) {
        return adminService.addCrewFlights(crewFlights);
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

}
