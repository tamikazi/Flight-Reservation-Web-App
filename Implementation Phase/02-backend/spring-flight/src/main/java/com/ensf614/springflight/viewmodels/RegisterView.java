package com.ensf614.springflight.viewmodels;

import lombok.Data;

@Data
public class RegisterView {
    private String username;
    private String password;
    private String Fname;
    private String Lname;
    private String address;
    private boolean card;
}
