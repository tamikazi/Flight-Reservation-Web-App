package com.ensf614.springflight.service;

import com.ensf614.springflight.model.CrewFlights;
import com.ensf614.springflight.repository.CrewFlightsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CrewFlightsService {

    private CrewFlightsRepository crewFlightsRepository;

    public CrewFlightsService(CrewFlightsRepository crewFlightsRepository) {
        this.crewFlightsRepository = crewFlightsRepository;
    }
    public List<CrewFlights> allCrewFlights() {
        return crewFlightsRepository.findAll();
    }
    public List<CrewFlights> allCrewFlightsOnCrew(int crewID) { return crewFlightsRepository.findByCrewID(crewID); }

    public List<CrewFlights> allCrewFlightsOnFlight(int flightID) { return crewFlightsRepository.findByFlightID(flightID); }




}
