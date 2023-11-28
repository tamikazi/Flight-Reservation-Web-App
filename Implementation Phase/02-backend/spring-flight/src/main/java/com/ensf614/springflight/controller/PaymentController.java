package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Payment;
import com.ensf614.springflight.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/payment")

public class PaymentController {

        private PaymentRepository paymentRepository;

        @Autowired
        public PaymentController(PaymentRepository paymentRepository) {
            this.paymentRepository = paymentRepository;
        }

        @GetMapping("/all")
        public List<Payment> getAllPayments() {
            return paymentRepository.findAll();
        }

        @GetMapping("/id/{id}")
        public Optional<Payment> getPaymentById(@PathVariable int id) {
            return paymentRepository.findByPaymentID(id);
        }

        @GetMapping("/user/{userID}")
        public List<Payment> getPaymentByUserID(@PathVariable int userID) {
            return paymentRepository.findByUserID(userID);
        }

        @PostMapping("/add")
        public Payment addPayment(@RequestBody Payment payment) {
            return paymentRepository.save(payment);
        }

        @Transactional
        @DeleteMapping("/delete/{paymentID}")
        public void deletePayment(@PathVariable int paymentID) {
            paymentRepository.deleteByPaymentID(paymentID);
        }
}
