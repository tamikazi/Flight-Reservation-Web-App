package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
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

    @Column(name = "aircraftID", insertable = false, updatable = false)
    private int aircraftID;

    @ManyToOne
    @JoinColumn(name = "aircraftID")
    private Aircraft aircraft;

    @Column(name = "basePrice")
    private float basePrice;

}
