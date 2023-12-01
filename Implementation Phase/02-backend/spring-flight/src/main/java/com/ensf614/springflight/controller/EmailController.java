package com.ensf614.springflight.controller;

import com.ensf614.springflight.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/send")
    public String sendEmail() {
        String to = "tahmidkazi829@gmail.com";
        String subject = "Test Email";
        String text = "This is a test email sent from my Spring Boot application.";

        emailService.sendSimpleMessage(to, subject, text);

        return "Email sent successfully!";
    }
}
