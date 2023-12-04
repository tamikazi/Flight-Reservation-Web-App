package com.ensf614.springflight.service;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.viewmodels.LoginView;
import com.ensf614.springflight.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class LoginService {
    private UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginView authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsernameAndPassword(username, password);
        if (user.isPresent()) {
            LoginView currentUser = new LoginView();
            currentUser.setUserID(user.get().getUserID());
            currentUser.setRoleID(user.get().getRoleID());
            return currentUser;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
    }
}
