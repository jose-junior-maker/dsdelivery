package com.devsuperior.dsdelivery.services;

import com.devsuperior.dsdelivery.dto.OrderDTO;
import com.devsuperior.dsdelivery.dto.ProductDTO;
import com.devsuperior.dsdelivery.entities.Order;
import com.devsuperior.dsdelivery.entities.OrderStatus;
import com.devsuperior.dsdelivery.entities.Product;
import com.devsuperior.dsdelivery.repositories.OrderRepository;
import com.devsuperior.dsdelivery.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<OrderDTO> findAll(){
        List<Order> orders = orderRepository.findOrderWithProducts();
        return orders.stream().map(OrderDTO::new).toList();
    }

    @Transactional
    public OrderDTO insert(OrderDTO orderDTO){
        Order order = new Order(
                null,
                orderDTO.getAddress(),
                orderDTO.getLatitude(),
                orderDTO.getLongitude(),
                Instant.now(),
                OrderStatus.PENDING);

        for(ProductDTO p : orderDTO.getProducts()){
            Product product = productRepository.getReferenceById(p.getId());
            order.getProducts().add(product);
        }

        order = orderRepository.save(order);
        return new OrderDTO(order);
    }

    @Transactional
    public OrderDTO setDelivered(Long id){
        Order order = orderRepository.getReferenceById(id);
        order.setStatus(OrderStatus.DELIVERED);
        order = orderRepository.save(order);
        return new OrderDTO(order);
    }
}
