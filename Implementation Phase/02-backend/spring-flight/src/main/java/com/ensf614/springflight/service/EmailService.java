package com.ensf614.springflight.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.FlightRepository;
import com.ensf614.springflight.email.EmailTicket;
import com.ensf614.springflight.email.EmailCancel;
import com.ensf614.springflight.email.EmailStrategy;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender emailSender;
    private UserRepository userRepository;
    private TicketRepository ticketRepository;
    private SeatRepository seatRepository;
    private FlightRepository flightRepository;
    private EmailTicket emailTicket;
    private EmailCancel emailCancel;

    public EmailService(JavaMailSender emailSender, UserRepository userRepository, TicketRepository ticketRepository,
                        SeatRepository seatRepository, FlightRepository flightRepository, EmailTicket emailTicket,
                        EmailCancel emailCancel) {
        this.emailSender = emailSender;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.seatRepository = seatRepository;
        this.flightRepository = flightRepository;
        this.emailTicket = emailTicket;
        this.emailCancel = emailCancel;
    }

    public void sendEmail (Ticket ticket, EmailStrategy emailStrategy) {
        String emailContent = emailStrategy.generateContent(ticket);
        SimpleMailMessage message = new SimpleMailMessage();

        if (ticket.getUserID() != 1) {
            message.setTo(userRepository.findByUserID(ticket.getUserID()).getUsername()); // Assume all tickets have the same user email
        } else {
            message.setTo(ticket.getEmail());
        }
        message.setSubject(emailStrategy instanceof EmailTicket ?
                        "Flight Ticket Purchase Confirmation" : "Flight Ticket Cancellation");
        message.setText(emailContent);
        emailSender.send(message);
    }

    public void ticketEmail(Ticket ticket) {
        sendEmail(ticket, emailTicket);
    }

    public void ticketCancellationEmail(Ticket ticket) {
        sendEmail(ticket, emailCancel);

    }

}
