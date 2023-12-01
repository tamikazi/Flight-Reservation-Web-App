package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Number> {
    Aircraft findByAircraftID(int aircraftID);

    List<Aircraft> findByModel(String model);

    Aircraft save(Aircraft aircraft);

    void deleteByAircraftID(int aircraftID);

}
