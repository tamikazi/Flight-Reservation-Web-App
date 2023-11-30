package com.ensf614.springflight.service;

import org.springframework.stereotype.Service;
import com.ensf614.springflight.model.User;
import com.ensf614.springflight.viewmodels.UserView;
import com.ensf614.springflight.repository.UserRepository;


@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
