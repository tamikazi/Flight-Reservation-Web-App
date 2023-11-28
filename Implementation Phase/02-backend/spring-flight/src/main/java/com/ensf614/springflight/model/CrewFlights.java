package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CREW_FLIGHTS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrewFlights {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crewID")
    private int crewID;

    @Column(name = "userID")
    private int userID;

    @Column(name = "flightID")
    private int flightID;

}
