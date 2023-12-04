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

    @Query("SELECT s FROM Seat s, Flight f WHERE s.aircraftID = f.aircraftID AND f.flightID = :flightId")
    List<Seat> findByFlightID(@Param("flightId") int flightId);

    @Query("SELECT s FROM Seat s, Ticket t, Flight f WHERE s.seatID = t.seatID AND t.flightID = f.flightID AND f.flightID = :flightId")
    List<Seat> findBookedSeats(@Param("flightId") int flightId);

}
