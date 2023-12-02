package com.ensf614.springflight.newsletter;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.service.EmailService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
public class NewsletterSender implements NewsletterSubject {
    private List<NewsletterObserver> subscribers = new ArrayList<>();

    @Autowired
    private UserRepository userRepository;

    @Getter
    @Autowired
    private EmailService emailService;

    @PostConstruct
    public void initSubscribers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> attach(new NewsletterSubscriber(emailService, user.getUsername())));
    }

    @Override
    public void attach(NewsletterObserver subscriber) {
        subscribers.add(subscriber);
        if (subscriber instanceof NewsletterSubscriber) {
            String userEmail = ((NewsletterSubscriber) subscriber).getUserEmail();
            // Fetch and attach the new user to the subscriber list
            User user = userRepository.findByUsername(userEmail);
            if (user != null) {
                attachNewUser(user);
            }
        }
    }

    @Override
    public void detach(NewsletterObserver subscriber) {
        subscribers.remove(subscriber);
    }

    @Override
    public void notifySubscribers(String newsletterContent) {
        for (NewsletterObserver subscriber : subscribers) {
            subscriber.update(newsletterContent);
        }
    }

    public void sendNewsletter(String newsletterContent) {
        notifySubscribers(newsletterContent);
    }

    public void attachNewUser(User user) {
        attach(new NewsletterSubscriber(emailService, user.getUsername()));
    }

}
