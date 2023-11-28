package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.CrewFlights;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
public interface CrewFlightsRepository extends JpaRepository<CrewFlights, String>{
    Optional<CrewFlights> findByCrewID(int crewID);
    List<CrewFlights> findByFlightID(int flightID);
    CrewFlights save(CrewFlights crewFlights);

}
