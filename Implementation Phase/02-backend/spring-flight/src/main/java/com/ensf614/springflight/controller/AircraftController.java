package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.service.AircraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/aircraft")
public class AircraftController {

    private AircraftService aircraftService;

    @Autowired
    public AircraftController(AircraftService aircraftService) {
        this.aircraftService = aircraftService;
    }

    @GetMapping
    public List<Aircraft> getAllAircraft() {
        return aircraftService.allAircrafts();
    }

    @GetMapping("/id/{id}")
    public Aircraft getAircraftById(@PathVariable int id) {
        return aircraftService.aircraftByID(id);
    }

    @GetMapping("/model/{model}")
    public List<Aircraft> getAircraftById(@PathVariable String model) {
        return aircraftService.aircraftByModel(model);
    }

}
