package com.ensf614.springflight.newsletter;

import com.ensf614.springflight.service.EmailService;

public class NewsletterSubscriber implements NewsletterObserver {
    private final EmailService emailService;
    private final String userEmail;

    public NewsletterSubscriber(EmailService emailService, String userEmail) {
        this.emailService = emailService;
        this.userEmail = userEmail;
    }

    @Override
    public void update(String newsletterContent) {
        emailService.sendNewsletterEmail(userEmail, newsletterContent);
    }
}
