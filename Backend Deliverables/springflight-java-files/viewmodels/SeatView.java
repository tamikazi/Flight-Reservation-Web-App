package com.ensf614.springflight.viewmodels;
import lombok.Data;

@Data
public class SeatView {
    private int seatID;
    private String seatNumber;
    private String seatClass;
    private float price;
    private boolean available;

}
