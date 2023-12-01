package com.ensf614.springflight.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.ensf614.springflight.model.Ticket;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.repository.TicketRepository;
import com.ensf614.springflight.repository.SeatRepository;
import com.ensf614.springflight.repository.FlightRepository;
import java.util.List;

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

    public void ticketEmail(List<Ticket> tickets) {
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Dear User,\n\n");
        emailBody.append("Thank you for purchasing flight tickets!\n\n");
        emailBody.append("Here are your booking details:\n");

        for (Ticket ticket : tickets) {
            emailBody.append("-------------------------------------------\n");
            emailBody.append("Ticket ID: " + ticket.getTicketID() + "\n");
            emailBody.append("Seat: " + seatRepository.getById(ticket.getSeatID()).getSeatNumber() + "\n");
            emailBody.append("Flight: " + flightRepository.findByFlightID(ticket.getFlightID()).getCode() + "\n");
            emailBody.append("Origin: " + flightRepository.findByFlightID(ticket.getFlightID()).getOrigin() + "\n");
            emailBody.append("Destination: " + flightRepository.findByFlightID(ticket.getFlightID()).getDestination() + "\n");
            emailBody.append("Date: " + flightRepository.findByFlightID(ticket.getFlightID()).getDate() + "\n");
            emailBody.append("Time: " + flightRepository.findByFlightID(ticket.getFlightID()).getTime() + "\n");
            emailBody.append("-------------------------------------------\n");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userRepository.findByUserID(tickets.get(0).getUserID()).getUsername()); // Assume all tickets have the same user email
        message.setSubject("Flight Ticket Purchase Confirmation");
        message.setText(emailBody.toString());
        emailSender.send(message);

    }


//    public void emailRegister(Payment payment, RegisteredUser user) {
//        SimpleMailMessage mailmessage = new SimpleMailMessage();
//        mailmessage.setTo(user.getEmail());
//        mailmessage.setSubject("Registration Confirmed");
//        EmailBody em = new EmailBody();
//        em.setName(user.getUserName()).addPayment(payment);
//        mailmessage.setText(em.buildBody());
//        javaMailSender.send(mailmessage);
//    }
//
//    public void emailTicket(Ticket ticket, String name, String email) {
//        SimpleMailMessage mailmessage = new SimpleMailMessage();
//        mailmessage.setTo(email);
//        mailmessage.setSubject("Ticket Confirmed");
//        EmailBody em = new EmailBody();
//        em.addTicket(ticket).setName(name).addPayment(ticket.getThePayment());
//        mailmessage.setText(em.buildBody());
//        javaMailSender.send(mailmessage);
//    }
//
//    public void emailReceipt(String name, String email, Receipt receipt){
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setTo(email);
//        mailMessage.setSubject("Purchase confirmed: Here is your receipt!");
//        EmailBody em = new EmailBody();
//        em.setName(name).addReceipt(receipt);
//        mailMessage.setText(em.buildBody());
//        javaMailSender.send(mailMessage);
//    }
//
//    public void sendTicketCancellationEmail(Ticket ticket) {
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setTo(ticket.getOwnerEmail());
//        mailMessage.setSubject("Your ticket has been cancelled.");
//        mailMessage.setText("Your ticket with ID " + ticket.getTicketId() + " has been cancelled.");
//        mailMessage.setText("Your payment of " + ticket.getThePayment() + " is being reissued back to your credit card.");
//        javaMailSender.send(mailMessage);
//    }

}
