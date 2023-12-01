package com.ensf614.springflight.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PAYMENT")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentID")
    private int paymentID;

    @Column(name = "userID")
    private int userID;

    @Column(name = "email")
    private String email;

    @Column(name = "payDate")
    private String payDate;

    @Column(name = "amount")
    private float amount;
}
