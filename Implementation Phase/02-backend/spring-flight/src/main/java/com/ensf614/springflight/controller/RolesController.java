package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Roles;
import com.ensf614.springflight.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/roles")
public class RolesController {

        private RolesService rolesService;

        @Autowired
        public RolesController(RolesService rolesService) {
            this.rolesService = rolesService;
        }

        @GetMapping
        public List<Roles> getAllRoles() {
            return rolesService.allRoles();
        }

        @GetMapping("/id/{id}")
        public Roles getRoleById(@PathVariable int id) {
            return rolesService.roleByID(id);
        }
        @GetMapping("/name/{name}")
        public Roles getRoleByName(@PathVariable String name) {
            return rolesService.roleByName(name);
        }
}
