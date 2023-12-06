package com.ensf614.springflight.controller;

import com.ensf614.springflight.newsletter.NewsletterSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ensf614.springflight.newsletter.NewsletterTemplate;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    private final NewsletterSender newsletterSender;

    private NewsletterTemplate newsletterTemplate;

    @Autowired
    public NewsletterController(NewsletterSender newsletterSender, NewsletterTemplate newsletterTemplate) {
        this.newsletterSender = newsletterSender;
        this.newsletterTemplate = newsletterTemplate;
    }

    @PostMapping("/send")
    public String sendPromotion() {
        newsletterSender.sendNewsletter(newsletterTemplate.generatePromotion());

        return "Newsletter sent successfully!";
    }

    @Scheduled(cron = "0 0 0 1 * ?") // First day of the month at midnight
    public void sendMonthlyNewsletter() {
        newsletterSender.sendNewsletter(newsletterTemplate.generateMonthlyNewsletter());
    }
}
