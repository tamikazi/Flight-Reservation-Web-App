package com.ensf614.springflight.viewmodels;

import lombok.Data;

@Data
public class TicketView {
    private int flightID;
    private int userID;
    private int seatID;
    private String name;
    private String email;
    private float price;
    private boolean insurance;
}
