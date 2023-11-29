package com.ensf614.springflight.controller;

import com.ensf614.springflight.service.LoginService;
import com.ensf614.springflight.viewmodels.LoginView;
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

    @GetMapping("/{username}/{password}")
    public LoginView authenticateUser(@PathVariable String username, @PathVariable String password) {

        return loginService.authenticateUser(username, password);
    }
}
