package com.ensf614.springflight.newsletter;

import com.ensf614.springflight.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

@Component
public class NewsletterSubscriber implements NewsletterObserver{


    @Autowired
    private EmailService emailService;

    @Override
    public void update(String newsletterContent) {}


}
