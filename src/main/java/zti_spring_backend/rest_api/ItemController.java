package zti_spring_backend.rest_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.ItemNotFoundException;
import zti_spring_backend.model.Item;
import zti_spring_backend.repo.ItemRepository;

import java.util.List;

@RestController
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/auth/item")
    public ResponseEntity<List<Item>> getItems() {
        return ResponseEntity.ok(itemRepository.findAll());
    }

    @GetMapping("/auth/item/{id}")
    public ResponseEntity<Item> getItem(@PathVariable long id) {
        return ResponseEntity.ok(itemRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id)));
    }

    @PostMapping("/item")
    public ResponseEntity<Item> addItem(@RequestBody Item item)
    {
        return ResponseEntity.ok(itemRepository.save(item));
    }

    @PutMapping("/item/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable long id, @RequestBody Item item) {
        return ResponseEntity.ok(itemRepository.findById(id).map(oldItem -> {
            oldItem.setName(item.getName());
            oldItem.setDescription(item.getDescription());
            oldItem.setPrice(item.getPrice());
            return itemRepository.save(oldItem);
                })
                .orElseGet(() -> itemRepository.save(item)));
    }

    @DeleteMapping("/item/{id}")
    public void deleteItem(@PathVariable long id)
    {
        if(!itemRepository.existsById(id))
            throw new ItemNotFoundException(id);

        itemRepository.deleteById(id);
    }
}
