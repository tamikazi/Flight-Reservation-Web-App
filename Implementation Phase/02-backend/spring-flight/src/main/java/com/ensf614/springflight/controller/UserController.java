package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public User getUserById(@PathVariable int id) {
        return userRepository.findByUserID(id);
    }

}
