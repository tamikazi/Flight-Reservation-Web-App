package com.ensf614.springflight.newsletter;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.service.EmailService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NewsletterSender implements NewsletterSubject{

    private List<NewsletterObserver> subscribers = new ArrayList<>();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NewsletterSubscriber newsletterSubscriber;

    @PostConstruct
    public void initSubscribers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> {

            attach(newsletterSubscriber);
        });

    }

    //private NewsletterObserver createSubscriber(String email) {
        //NewsletterObserver newSubscriber = new NewsletterSubscriber(email);

    //}

    @Override
    public void attach(NewsletterObserver subscriber) {
        subscribers.add(subscriber);
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

}
