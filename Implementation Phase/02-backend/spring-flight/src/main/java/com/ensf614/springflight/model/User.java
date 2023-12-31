package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "USER")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID")
    private int userID;

    // check if user exists
    @Getter
    @Column(name = "username")
    private String username; // email

    @Getter
    @Column(name = "password")
    private String password;

    @Column(name = "roleID")
    private int roleID;

    @Column(name = "card")
    private boolean card;

    @Column(name = "fname")
    private String Fname;

    @Column(name = "lname")
    private String Lname;

    @Column(name = "address")
    private String address;

}
