package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/aircraft")
public class AircraftController {

    private AircraftRepository aircraftRepository;

    @Autowired
    public AircraftController(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping("/{id}")
    public Aircraft getAircraftById(@PathVariable int id) {
        return aircraftRepository.findById(id).orElse(null);
    }


}
