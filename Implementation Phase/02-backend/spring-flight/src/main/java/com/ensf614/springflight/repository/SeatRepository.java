package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, String> {
    List<Seat> findByAircraftID(int aircraftID);

}
