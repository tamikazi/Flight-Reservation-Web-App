package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.CrewFlights;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface CrewFlightsRepository extends JpaRepository<CrewFlights, String>{
    List<CrewFlights> findByCrewID(int crewID);
    List<CrewFlights> findByFlightID(int flightID);

}
