package com.ensf614.springflight.service;

import org.springframework.stereotype.Service;
import com.ensf614.springflight.model.Payment;
import com.ensf614.springflight.viewmodels.PaymentView;
import com.ensf614.springflight.repository.PaymentRepository;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
public class PaymentService {
    private PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment addPayment(PaymentView paymentView) {
        Payment payment = new Payment();

        payment.setUserID(paymentView.getUserID());
        payment.setPayDate(paymentView.getPayDate());
        payment.setAmount(paymentView.getAmount());
        
        return paymentRepository.save(payment);
    }

    public Optional<Payment> getPaymentById(int id) {
        return paymentRepository.findByPaymentID(id);
    }

    public List<PaymentView> getPaymentByUserID(int userID) {
        List<Payment> userPays = paymentRepository.findByUserID(userID);
        List<PaymentView> userPayments = new ArrayList<PaymentView>();

        for (Payment pay : userPays) {
            PaymentView payView = new PaymentView();
            payView.setUserID(pay.getUserID());
            payView.setPayDate(pay.getPayDate());
            payView.setAmount(pay.getAmount());
            userPayments.add(payView);
        }

        return userPayments;
    }

    public void deletePayment(int id) {
        paymentRepository.deleteByPaymentID(id);
    }
}
