package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUserID(int userID);

    User findByUsername(String username);

    List<User> findByRoleID(int roleID);

    List<User> findByMember(boolean member);

}
