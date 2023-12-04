package com.ensf614.springflight.newsletter;

import com.ensf614.springflight.service.EmailService;
import com.ensf614.springflight.model.User;
import lombok.Getter;

public class NewsletterSubscriber implements NewsletterObserver {

    private final EmailService emailService;
    @Getter
    private final String userEmail;

    public NewsletterSubscriber(EmailService emailService, User user) {
        this.emailService = emailService;
        this.userEmail = user.getUsername();
    }

    @Override
    public void update(String newsletterContent) {
        emailService.newsletterEmail(userEmail, newsletterContent);
    }

}
