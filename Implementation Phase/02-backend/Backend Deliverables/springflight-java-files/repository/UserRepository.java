package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User findByUserID(int userID);

    User findByUsername(String username);

    List<User> findByRoleID(int roleID);

    Optional<User> findByUsernameAndPassword(String username, String password);

    User save(User user);
}
