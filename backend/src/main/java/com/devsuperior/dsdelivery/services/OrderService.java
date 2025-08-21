package com.devsuperior.dsdelivery.services;

import com.devsuperior.dsdelivery.dto.OrderDTO;
import com.devsuperior.dsdelivery.entities.Order;
import com.devsuperior.dsdelivery.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Transactional(readOnly = true)
    public List<OrderDTO> findAll(){
        List<Order> orders = orderRepository.findOrderWithProducts();
        return orders.stream().map(OrderDTO::new).toList();
    }
}
