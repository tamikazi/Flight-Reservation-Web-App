package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, String>{

    Roles findByRoleID(int roleID);
    Roles findByRoleName(String roleName);
}
