package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.viewmodels.UserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/users")
public class UserController {

    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/id/{id}")
    public UserView getUserById(@PathVariable int id) {
        User user = userRepository.findByUserID(id);

        UserView userView = new UserView();

        userView.setUserID(user.getUserID());
        userView.setUsername(user.getUsername());
        userView.setFname(user.getFname());
        userView.setLname(user.getLname());
        userView.setCard(user.isCard());

        return userView;
    }

}
