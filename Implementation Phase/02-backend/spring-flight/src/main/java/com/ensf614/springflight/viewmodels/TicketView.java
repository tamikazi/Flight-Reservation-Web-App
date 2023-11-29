package com.ensf614.springflight.viewmodels;

import lombok.Data;

@Data
public class TicketView {
    private int ticketID;
    private int flightID;
    private int userID;
    private String seatNumber;
    private String name;
    private float price;
    private boolean insurance;
}
