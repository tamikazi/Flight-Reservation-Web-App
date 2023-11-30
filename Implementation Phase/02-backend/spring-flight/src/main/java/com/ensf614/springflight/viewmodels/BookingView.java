package com.ensf614.springflight.viewmodels;

import lombok.Data;

@Data
public class BookingView {
    private int ticketID;
    private String code;
    private String origin;
    private String destination;
    private String date;
    private String time;
    private String seatNumber;
    private String name;
    private boolean insurance;
}
