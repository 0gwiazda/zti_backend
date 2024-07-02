package zti_spring_backend.rest_api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.ItemNotFoundException;
import zti_spring_backend.model.Item;
import zti_spring_backend.repo.ItemRepository;

import java.util.List;

/**
 * Controller for item operations.
 */
@RestController
@Tag(name="Item Controller", description = "Controller for item operations")
public class ItemController {

    /**
     * Item repository described here: {@link zti_spring_backend.repo.ItemRepository}
     */
    @Autowired
    private ItemRepository itemRepository;

    /**
     * Endpoint for getting all items.
     * @return ResponseEntity with list of items and status code 200.
     */
    @GetMapping("/auth/item")
    @Operation(summary = "Get all items")
    public ResponseEntity<List<Item>> getItems() {
        return ResponseEntity.ok(itemRepository.findAll());
    }

    /**
     * Endpoint for getting a single item with id provided in path.
     * If item is not found throws {@link zti_spring_backend.exception.ItemNotFoundException}.
     * @param id id of item.
     * @return ResponseEntity with item and status code 200.
     */
    @GetMapping("/auth/item/{id}")
    @Operation(summary = "Returns an Item with id specified in path")
    public ResponseEntity<Item> getItem(@PathVariable long id) {
        return ResponseEntity.ok(itemRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id)));
    }

    /**
     * Endpoint for posting an item.
     * User needs to be authenticated for this operation.
     * @param item item data contained in RequestBody.
     * @return ResponseEntity with created item and status code 200.
     */
    @PostMapping("/item")
    @Operation(summary = "Add an item", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Item> addItem(@RequestBody Item item)
    {
        return ResponseEntity.ok(itemRepository.save(item));
    }

    /**
     * Endpoint for deleting item with provided id in path.
     * User needs to be authenticated for this operation.
     * @param id id of item.
     */
    @DeleteMapping("/item/{id}")
    @Operation(summary = "Delete an item", security = @SecurityRequirement(name = "bearerAuth"))
    public void deleteItem(@PathVariable long id)
    {
        if(!itemRepository.existsById(id))
            throw new ItemNotFoundException(id);

        itemRepository.deleteById(id);
    }
}
