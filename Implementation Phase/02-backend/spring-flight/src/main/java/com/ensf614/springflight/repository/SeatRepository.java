package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Number> {

    Seat findBySeatID(int seatID);

    List<Seat> findByAircraftID(int aircraftID);

    @Query("SELECT s FROM Seat s, Flight f WHERE s.aircraftID = f.aircraftID AND f.flightID = :flightId")
    List<Seat> findByFlightID(@Param("flightId") int flightId);

}
