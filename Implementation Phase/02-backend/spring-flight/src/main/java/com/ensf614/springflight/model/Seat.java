package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SEAT")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seatID")
    private int seatID;

    @Column(name = "aircraftID", insertable = false, updatable = false)
    private int aircraftID;

    @ManyToOne
    @JoinColumn (name = "aircraftID")
    private Aircraft aircraft;

    @Column(name = "seatNumber")
    private String seatNumber;

    @Column(name = "class")
    private String seatClass;
}
