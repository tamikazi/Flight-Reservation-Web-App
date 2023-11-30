package com.ensf614.springflight.viewmodels;

import lombok.Data;


@Data
public class PaymentView {
    private int paymentID;
    private int userID;
    private String payDate;
    private float amount;
}
