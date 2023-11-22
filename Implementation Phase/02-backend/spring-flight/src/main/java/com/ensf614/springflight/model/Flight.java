package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "flight")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FlightID")
    private String flightId;

    @Column(name = "Code")
    private String code;

    @Column(name = "Origin")
    private String origin;

    @Column(name = "Destination")
    private String destination;

    @Column(name = "Date")
    private String date;

    @Column(name = "Aircraft")
    private String aircraft;
}
