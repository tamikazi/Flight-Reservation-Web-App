package com.ensf614.springflight.controller;

import com.ensf614.springflight.service.UserService;
import com.ensf614.springflight.viewmodels.UserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/id/{id}")
    public UserView getUserById(@PathVariable int id) {
        return userService.userByID(id);
    }

}
