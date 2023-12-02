package com.ensf614.springflight.service;

import com.ensf614.springflight.newsletter.NewsletterSubscriber;
import com.ensf614.springflight.viewmodels.RegisterView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.ensf614.springflight.model.User;
import com.ensf614.springflight.viewmodels.UserView;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.newsletter.NewsletterSender;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    private UserRepository userRepository;
    private NewsletterSender newsletterSender;

    @Autowired
    public UserService(UserRepository userRepository, NewsletterSender newsletterSender) {
        this.userRepository = userRepository;
        this.newsletterSender = newsletterSender;
    }

    public UserView userByID(int userID) {
        User user = userRepository.findByUserID(userID);

        UserView userView = new UserView();

        userView.setUserID(user.getUserID());
        userView.setUsername(user.getUsername());
        userView.setFname(user.getFname());
        userView.setLname(user.getLname());
        userView.setCard(user.isCard());



        return userView;
    }

    public User addUser(RegisterView registerView) {
        User existingUser = userRepository.findByUsername(registerView.getUsername());
        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This username already exists. Please try again.");
        }

        User user = new User();
        user.setUsername(registerView.getUsername());
        user.setPassword(registerView.getPassword());
        user.setFname(registerView.getFname());
        user.setLname(registerView.getLname());
        user.setAddress(registerView.getAddress());
        user.setCard(registerView.isCard());
        user.setRoleID(4);
        userRepository.save(user);

        newsletterSender.attachNewUser(user);

        return user;
    }

}
