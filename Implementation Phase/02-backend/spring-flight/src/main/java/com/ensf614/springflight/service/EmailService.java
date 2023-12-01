package com.ensf614.springflight.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendSimpleMessage(
            String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

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
