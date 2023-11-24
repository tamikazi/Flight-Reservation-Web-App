package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Seat;
import com.ensf614.springflight.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatService {

    private SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public List<Seat> allSeats() {
        return seatRepository.findAll();
    }

    public List<Seat> allSeatsOnAircraft(int aircraftID) { return seatRepository.findByAircraftID(aircraftID); }

}
