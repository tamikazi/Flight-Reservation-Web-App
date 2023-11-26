package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
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

    @Column(name = "seatID", insertable = false, updatable = false)
    private int seatID;

    @OneToOne
    @JoinColumn(name = "seatID")
    private Seat seat;

    @Column(name = "flightID", insertable = false, updatable = false)
    private int flightID;

    @ManyToOne
    @JoinColumn(name = "flightID")
    private Flight flight;

    @Column(name = "userID", insertable = false, updatable = false)
    private int userID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @Column(name = "insurance")
    private boolean insurance;
}
