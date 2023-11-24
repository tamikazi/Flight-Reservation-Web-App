package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, String> {

    Seat findBySeatID(int seatID);

    List<Seat> findByAircraftID(int aircraftID);



}
