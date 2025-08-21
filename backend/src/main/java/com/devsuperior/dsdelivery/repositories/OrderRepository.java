package com.devsuperior.dsdelivery.repositories;

import com.devsuperior.dsdelivery.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
