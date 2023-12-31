package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "FLIGHT")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flightID")
    private int flightID;

    @Column(name = "code")
    private String code;

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @Column(name = "departDate")
    private String date;

    @Column(name = "departTime")
    private String time;

    @Column(name = "aircraftID")
    private int aircraftID;

    @Getter
    @Column(name = "basePrice")
    private float basePrice;

}
