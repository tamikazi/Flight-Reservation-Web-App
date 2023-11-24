package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public List<User> getAllUsers() {
        return userService.allUsers();
    }

    @GetMapping("/id/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.userByID(id);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.userByUsername(username);
    }

    @GetMapping("/role/{id}")
    public List<User> getUserByUsername(@PathVariable int id) {
        return userService.allUsersByRole(id);
    }

    @GetMapping("/member/{member}")
    public List<User> getUserByMember(@PathVariable boolean member) {
        return userService.allUsersByMember(member);
    }

}
