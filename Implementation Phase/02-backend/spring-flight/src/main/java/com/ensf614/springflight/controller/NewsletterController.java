package com.ensf614.springflight.controller;

import com.ensf614.springflight.newsletter.NewsletterSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    private final NewsletterSender newsletterSender;

    @Autowired
    public NewsletterController(NewsletterSender newsletterSender) {
        this.newsletterSender = newsletterSender;
    }

    @PostMapping("/send")
    public String sendNewsletter() {
        // Retrieve newsletter content from a service or another source
        String newsletterContent = "This is a sample newsletter content.";

        // Send the newsletter
        newsletterSender.sendNewsletter(newsletterContent);

        return "Newsletter sent successfully!";
    }
}
