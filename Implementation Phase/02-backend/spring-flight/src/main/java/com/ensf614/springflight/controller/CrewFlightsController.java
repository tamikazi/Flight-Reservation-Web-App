package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.CrewFlights;
import com.ensf614.springflight.service.CrewFlightsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/crewflights")
public class CrewFlightsController {

    private CrewFlightsService crewFlightsService;

    @Autowired
    public CrewFlightsController(CrewFlightsService crewFlightsService) {
        this.crewFlightsService = crewFlightsService;
    }

    @GetMapping
    public List<CrewFlights> getAllCrewFlights() {
        return crewFlightsService.allCrewFlights();
    }

    @GetMapping("/crewid/{id}")
    public List<CrewFlights> getCrewFlightsByCrewID(@PathVariable int id) {
        return crewFlightsService.allCrewFlightsOnCrew(id);
    }
    @GetMapping("/flightid/{id}")
    public List<CrewFlights> getCrewFlightsByFlightID(@PathVariable int id) {
        return crewFlightsService.allCrewFlightsOnFlight(id);
    }
}
