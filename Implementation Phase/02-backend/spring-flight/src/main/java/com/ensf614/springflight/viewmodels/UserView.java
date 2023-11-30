package com.ensf614.springflight.viewmodels;

import lombok.Data;

@Data
public class UserView {
    private int userID;
    private String username;
    private String Fname;
    private String Lname;
    private boolean card;
}
