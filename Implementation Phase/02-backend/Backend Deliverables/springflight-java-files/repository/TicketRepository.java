package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, String> {

    Ticket findByTicketID(int ticketID);

    List<Ticket> findByUserID(int userID);

    List<Ticket> findByFlightID(int flightID);

    List<Ticket> findByTicketIDAndName(int ticketID, String name);

    Ticket save(Ticket ticket);

    void deleteByTicketID(int ticketID);

}
