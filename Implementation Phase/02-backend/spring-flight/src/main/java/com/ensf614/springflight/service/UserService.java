package com.ensf614.springflight.service;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User userByID(int userID) {
        return userRepository.findByUserID(userID);
    }

    public User userByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> allUsersByRole(int roleID) {
        return userRepository.findByRoleID(roleID);
    }

    public List<User> allUsersByMember(boolean member) {
        return userRepository.findByMember(member);
    }

}
