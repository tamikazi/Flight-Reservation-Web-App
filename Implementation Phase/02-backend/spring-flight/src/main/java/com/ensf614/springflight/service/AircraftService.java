package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.repository.AircraftRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AircraftService {

    private AircraftRepository aircraftRepository;

    public AircraftService(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    public List<Aircraft> allAircrafts() {
        return aircraftRepository.findAll();
    }

    public Aircraft aircraftByID(int id) {
        return aircraftRepository.findByAircraftID(id);
    }

    public List<Aircraft> aircraftByModel(String model) { return aircraftRepository.findByModel(model); }

}
