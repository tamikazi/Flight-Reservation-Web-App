package com.ensf614.springflight.service;

import com.ensf614.springflight.viewmodels.RegisterView;
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

    public void addUser(RegisterView registerView) {
        User user = new User();
        user.setUsername(registerView.getUsername());
        user.setPassword(registerView.getPassword());
        user.setFname(registerView.getFname());
        user.setLname(registerView.getLname());
        user.setAddress(registerView.getAddress());
        user.setCard(registerView.isCard());
        user.setRoleID(4);
        userRepository.save(user);
    }

}
