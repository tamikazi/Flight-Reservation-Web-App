package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Number> {

    // Currently returns first instance of flight with specified code
    Optional<Flight> findByCode(String code);

    List<Flight> findByDate(String date);

    List<Flight> findByDateAndOriginAndDestination(String date, String origin, String destination);

    List<Flight> findByOriginAndDestination(String origin, String destination);

    void deleteByFlightID(int flightID);

}
