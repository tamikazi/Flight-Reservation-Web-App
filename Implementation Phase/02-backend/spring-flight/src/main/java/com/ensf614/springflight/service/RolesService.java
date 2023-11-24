package com.ensf614.springflight.service;

import com.ensf614.springflight.model.Roles;
import com.ensf614.springflight.repository.RolesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {

    private RolesRepository rolesRepository;

    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Roles roleByID(int roleID) {
        return rolesRepository.findByRoleID(roleID);
    }
    public Roles roleByName(String roleName) {
        return rolesRepository.findByRoleName(roleName);
    }
    public List<Roles> allRoles() {
        return rolesRepository.findAll();
    }
}
