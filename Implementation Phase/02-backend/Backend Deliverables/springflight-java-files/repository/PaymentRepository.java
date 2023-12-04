package com.ensf614.springflight.repository;

import com.ensf614.springflight.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Number> {

    Optional<Payment> findByPaymentID(int paymentID);

    List<Payment> findByUserID(int userID);

    Payment save(Payment payment);

    void deleteByPaymentID(int paymentID);
}
