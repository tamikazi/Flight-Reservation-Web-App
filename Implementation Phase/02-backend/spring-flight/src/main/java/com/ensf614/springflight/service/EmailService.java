package com.ensf614.springflight.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.FlightRepository;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender emailSender;
    private UserRepository userRepository;
    private TicketRepository ticketRepository;
    private SeatRepository seatRepository;

    private FlightRepository flightRepository;

    public EmailService(JavaMailSender emailSender, UserRepository userRepository, TicketRepository ticketRepository,
                        SeatRepository seatRepository, FlightRepository flightRepository) {
        this.emailSender = emailSender;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.seatRepository = seatRepository;
        this.flightRepository = flightRepository;
    }

    public void sendSimpleMessage(
            String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);
    }

    public void ticketEmail(Ticket ticket) {
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Dear " + ticket.getName() + ",\n\n");
        emailBody.append("Thank you for purchasing flight tickets!\n\n");
        emailBody.append("Here are your booking details:\n");

        emailBody.append("-------------------------------------------\n");
        emailBody.append("Ticket ID: " + ticket.getTicketID() + "\n");
        emailBody.append("Seat: " + seatRepository.getById(ticket.getSeatID()).getSeatNumber() + "\n");
        emailBody.append("Flight: " + flightRepository.findByFlightID(ticket.getFlightID()).getCode() + "\n");
        emailBody.append("Origin: " + flightRepository.findByFlightID(ticket.getFlightID()).getOrigin() + "\n");
        emailBody.append("Destination: " + flightRepository.findByFlightID(ticket.getFlightID()).getDestination() + "\n");
        emailBody.append("Date: " + flightRepository.findByFlightID(ticket.getFlightID()).getDate() + "\n");
        emailBody.append("Time: " + flightRepository.findByFlightID(ticket.getFlightID()).getTime() + "\n");
        emailBody.append("-------------------------------------------\n");
        float cost = ticket.getCost();

        if (ticket.isInsurance()) {
            cost += 50;
        }
        emailBody.append("Total: $" + cost + "\n");
        emailBody.append("-------------------------------------------\n");
        emailBody.append("Thank you for flying with us!\n");

        SimpleMailMessage message = new SimpleMailMessage();

        if (ticket.getUserID() != 1) {
            message.setTo(userRepository.findByUserID(ticket.getUserID()).getUsername()); // Assume all tickets have the same user email
        } else {
            message.setTo(ticket.getEmail());
        }

        message.setSubject("Flight Ticket Purchase Confirmation");
        message.setText(emailBody.toString());
        emailSender.send(message);
    }

    public void ticketCancellationEmail(Ticket ticket) {
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Dear " + ticket.getName() + ",\n\n");
        emailBody.append("Your flight has been cancelled.\n\n");
        emailBody.append("Here are your booking details:\n");

        emailBody.append("-------------------------------------------\n");
        emailBody.append("Ticket ID: " + ticket.getTicketID() + "\n");
        emailBody.append("Seat: " + seatRepository.getById(ticket.getSeatID()).getSeatNumber() + "\n");
        emailBody.append("Flight: " + flightRepository.findByFlightID(ticket.getFlightID()).getCode() + "\n");
        emailBody.append("Origin: " + flightRepository.findByFlightID(ticket.getFlightID()).getOrigin() + "\n");
        emailBody.append("Destination: " + flightRepository.findByFlightID(ticket.getFlightID()).getDestination() + "\n");
        emailBody.append("Date: " + flightRepository.findByFlightID(ticket.getFlightID()).getDate() + "\n");
        emailBody.append("Time: " + flightRepository.findByFlightID(ticket.getFlightID()).getTime() + "\n");
        emailBody.append("-------------------------------------------\n");
        emailBody.append("Total Amount Refunded: $" + ticket.getCost() + "\n");
        emailBody.append("-------------------------------------------\n");

        SimpleMailMessage message = new SimpleMailMessage();
        if (ticket.getUserID() != 1) {
            message.setTo(userRepository.findByUserID(ticket.getUserID()).getUsername()); // Assume all tickets have the same user email
        } else {
            message.setTo(ticket.getEmail());
        }
        message.setSubject("Flight Ticket Cancellation");
        message.setText(emailBody.toString());
        emailSender.send(message);
    }

}
