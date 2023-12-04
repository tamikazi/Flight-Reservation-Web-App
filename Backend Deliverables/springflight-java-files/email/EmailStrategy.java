package com.ensf614.springflight.email;

import com.ensf614.springflight.model.Ticket;

public interface EmailStrategy {
    String generateContent(Ticket ticket);
}
