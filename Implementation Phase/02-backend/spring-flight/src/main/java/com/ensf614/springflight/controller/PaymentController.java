package com.ensf614.springflight.controller;

import com.ensf614.springflight.model.Payment;
import com.ensf614.springflight.viewmodels.PaymentView;
import com.ensf614.springflight.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController // abstract controller
@RequestMapping("/api/payment")

public class PaymentController {
        private PaymentService paymentService;

        @Autowired
        public PaymentController(PaymentService paymentService) {
            this.paymentService = paymentService;
        }

        @GetMapping("/id/{id}")
        public Optional<Payment> getPaymentById(@PathVariable int id) {
            return paymentService.getPaymentById(id);
        }

        @GetMapping("/user/{userID}")
        public List<PaymentView> getPaymentByUserID(@PathVariable int userID) {
            return paymentService.getPaymentByUserID(userID);
        }

        @PostMapping("/add")
        public Payment addPayment(@RequestBody Payment payment) {
            return paymentService.addPayment(payment);
        }

        @Transactional
        @DeleteMapping("/delete/{paymentID}")
        public void deletePayment(@PathVariable int paymentID) {
            paymentService.deletePayment(paymentID);
        }
}
