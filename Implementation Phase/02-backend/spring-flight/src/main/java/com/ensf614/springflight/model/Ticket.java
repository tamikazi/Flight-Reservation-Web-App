package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TICKET")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketID")
    private int ticketID;

    @Column(name = "seatID")
    private int seatID;

    @Column(name = "flightID")
    private int flightID;

    @Column(name = "userID")
    private int userID;

    @Column(name = "name")
    private String name;

    @Column(name = "cost")
    private float cost;

    @Getter
    @Column(name = "insurance")
    private boolean insurance;
}
