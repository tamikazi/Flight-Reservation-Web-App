package com.ensf614.springflight.service;

import com.ensf614.springflight.model.User;
import com.ensf614.springflight.repository.UserRepository;
import com.ensf614.springflight.model.Aircraft;
import com.ensf614.springflight.repository.AircraftRepository;
import com.ensf614.springflight.model.CrewFlights;
import com.ensf614.springflight.repository.CrewFlightsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

        private UserRepository userRepository;
        private AircraftRepository aircraftRepository;
        private CrewFlightsRepository crewFlightsRepository;

        public AdminService(UserRepository userRepository, AircraftRepository aircraftRepository, CrewFlightsRepository crewFlightsRepository) {
            this.userRepository = userRepository;
            this.aircraftRepository = aircraftRepository;
            this.crewFlightsRepository = crewFlightsRepository;
        }

        public List<User> allUsers() {
            return userRepository.findAll();
        }

        public List<Aircraft> allAircrafts() {
            return aircraftRepository.findAll();
        }

        public Aircraft addAircraft(Aircraft aircraft) {
            return aircraftRepository.save(aircraft);
        }

        public void deleteAircraft(int aircraftID) {
            aircraftRepository.deleteByAircraftID(aircraftID);
        }

        public List<CrewFlights> allCrewFlights() {
            return crewFlightsRepository.findAll();
        }

        public CrewFlights addCrewFlights(CrewFlights crewFlights) {
            return crewFlightsRepository.save(crewFlights);
        }

}
