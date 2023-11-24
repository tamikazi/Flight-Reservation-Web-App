package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, String> {

    Ticket findByTicketID(int ticketID);
    Ticket findByTicketIDAndUserID(int ticketID, int userID);

    List<Ticket> findByUserID(int userID);

    List<Ticket> findByFlightID(int flightID);

    List<Ticket> findByFlightIDAndUserID(int flightID, int userID);



}
