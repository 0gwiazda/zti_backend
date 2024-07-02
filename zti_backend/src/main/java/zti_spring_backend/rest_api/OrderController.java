package zti_spring_backend.rest_api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.OrderInvalidQuantityException;
import zti_spring_backend.exception.OrderNotFoundException;
import zti_spring_backend.model.Order;
import zti_spring_backend.repo.OrderRepository;

import java.util.List;

/**
 * Controller for order operations.
 */
@RestController
@Tag(name="Order Controller", description = "Controller for order operations")
public class OrderController {

    /**
     * Order repository described here {@link zti_spring_backend.repo.OrderRepository}
     */
    @Autowired
    private OrderRepository orderRepository;

    /**
     * Endpoint for getting all orders.
     * @return ResponseEntity wit list of orders and status code 200.
     */
    @GetMapping("/auth/order")
    @Operation(summary = "Get all orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    /**
     * Endpoint for getting an order with provided id in path.
     * If order is not found throws {@link zti_spring_backend.exception.OrderNotFoundException}
     * @param id id of order
     * @return ResponseEntity with order and status code 200.
     */
    @GetMapping("/auth/order/{id}")
    @Operation(summary = "Get an order with id provided in path")
    public ResponseEntity<Order> getOrderById(@PathVariable long id) {
        return ResponseEntity.ok(orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException(id)));
    }

    /**
     * Endpoint for getting all orders with matching user id provided in query string.
     * User needs to be authenticated for this operation.
     * @param userId id of user.
     * @return ResponseEntity with list of orders.
     */
    @GetMapping("/order")
    @Operation(summary = "Get all orders with matching user id", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Order>> getOrdersByUserId(@RequestParam long userId) {
        return ResponseEntity.ok(orderRepository.findAllByBuyerid(userId));
    }

    /**
     * Endpoint for counting orders with offer id provided in path.
     * User needs to be authenticated for this operation.
     * @param offerid id of offer.
     * @return ResponseEntity with count and status code 200.
     */
    @GetMapping("/count-orders/{offerid}")
    @Operation(summary = "Count all orders attached to an offer by offerid")
    public ResponseEntity<Long> countOrders(@PathVariable long offerid) {
        return ResponseEntity.ok(orderRepository.countByOfferid(offerid));
    }

    /**
     * Endpoint for posting an order.
     * User needs to be authenticated for this operation.
     * If quantity is less or equal to zero throws {@link zti_spring_backend.exception.OrderInvalidQuantityException}
     * @param order order data in RequestBody
     * @return ResponseEntity with created order and status code 200.
     */
    @PostMapping("/order")
    @Operation(summary = "Add an order", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Order> createOrder(@RequestBody Order order)
    {
        if(order.getQuantity() <= 0)
            throw new OrderInvalidQuantityException(order.getQuantity());

        return ResponseEntity.ok(orderRepository.save(order));
    }

    /**
     * Endpoint for deleting an order with id provided in path.
     * User needs to be authenticated for this operation.
     * If order with this id is not found throws {@link zti_spring_backend.exception.OrderNotFoundException}.
     * @param id id of order.
     * @return ResponseEntity with success message and status code 200.
     */
    @DeleteMapping("/order/{id}")
    @Operation(summary = "Delete an order with matching id", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteOrder(@PathVariable long id)
    {
        if(!orderRepository.existsById(id))
            throw new OrderNotFoundException(id);

        orderRepository.deleteById(id);
        return ResponseEntity.ok("Order deleted");
    }
}
