package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AircraftRepository extends JpaRepository<Aircraft, String> {
    List<Aircraft> findByAircraftID(int aircraftID);

    List<Aircraft> findByModel(String model);

}
