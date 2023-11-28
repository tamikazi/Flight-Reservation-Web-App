package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/login")
public class LoginController {

    private LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/authenticate")
    public User authenticateUser(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        return loginService.authenticateUser(username, password);
    }
}
