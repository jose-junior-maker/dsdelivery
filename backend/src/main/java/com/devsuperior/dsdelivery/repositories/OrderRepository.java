package com.devsuperior.dsdelivery.repositories;

import com.devsuperior.dsdelivery.entities.Order;
import com.devsuperior.dsdelivery.entities.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    //List<Order> findAllByStatusIsOrderByMomentAsc(OrderStatus status);

    @Query("SELECT DISTINCT obj FROM Order obj JOIN FETCH obj.products WHERE obj.status = 0 ORDER BY obj.moment ASC")
    List<Order> findOrderWithProducts();
}
