package com.ensf614.springflight.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "AIRCRAFT")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aircraftID")
    private int aircraftID;

    @Column(name = "model")
    private String model;

    @Getter
    @Column(name = "numCols")
    private int numCols;

    @Getter
    @Column(name = "numRows")
    private int numRows;

}
