package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
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

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "roleID")
    private int roleID;

    @OneToOne
    @JoinColumn(name = "roleID")
    private Roles role;

    @Column(name = "member")
    private boolean member;

    @Column(name = "Fname")
    private String Fname;

    @Column(name = "Lname")
    private String Lname;

}
