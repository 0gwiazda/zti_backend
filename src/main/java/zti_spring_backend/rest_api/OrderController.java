package zti_spring_backend.rest_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.OrderInvalidQuantityException;
import zti_spring_backend.exception.OrderNotFoundException;
import zti_spring_backend.model.Order;
import zti_spring_backend.repo.OrderRepository;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/auth/order")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/auth/order/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable long id) {
        return ResponseEntity.ok(orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException(id)));
    }

    @GetMapping("/order")
    public ResponseEntity<List<Order>> getOrdersByUserId(@RequestParam long userId) {
        return ResponseEntity.ok(orderRepository.findAllByBuyerid(userId));
    }

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody Order order)
    {
        if(order.getQuantity() <= 0)
            throw new OrderInvalidQuantityException(order.getQuantity());

        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/order/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable long id, @RequestBody Order order) {
        return ResponseEntity.ok(orderRepository.findById(id).map(oldOrder -> {
            oldOrder.setQuantity(order.getQuantity());
            return orderRepository.save(oldOrder);
        }).orElseGet(() -> orderRepository.save(order)));
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable long id)
    {
        if(!orderRepository.existsById(id))
            throw new OrderNotFoundException(id);

        orderRepository.deleteById(id);
        return ResponseEntity.ok("Order deleted");
    }
}
