package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Number> {
    Aircraft save(Aircraft aircraft);

    void deleteByAircraftID(int aircraftID);

}
