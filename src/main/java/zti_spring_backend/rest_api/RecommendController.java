package zti_spring_backend.rest_api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.RecommendAlreadyExistsException;
import zti_spring_backend.exception.RecommendNotFoundException;
import zti_spring_backend.model.Recommend;
import zti_spring_backend.repo.RecommendRepository;

import java.util.List;

@RestController
@Tag(name = "Recommend Controller", description = "Controller for recommendation (likes or dislikes) operations")
public class RecommendController {

    @Autowired
    RecommendRepository recommendRepository;


    @GetMapping("/auth/recommend")
    @Operation(summary = "Get all recommends")
    public ResponseEntity<List<Recommend>> allRecommend() {
        return ResponseEntity.ok(recommendRepository.findAll());
    }

    
    @GetMapping("/recommend")
    @Operation(summary = "Get a recommend posted by user with matching userid under seller with matching sellerid", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Recommend> getRecommend(@RequestParam long userid, @RequestParam long sellerid) {
        return ResponseEntity.ok(recommendRepository.findBySelleridAndUserid(sellerid, userid).orElse(null));
    }

    @GetMapping("/auth/recommend/seller/{id}")
    @Operation(summary = "Count likes or dislikes for seller with matching sellerid", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Long> getLikedRecommend(@PathVariable long id, @RequestParam boolean liked){
        return ResponseEntity.ok(recommendRepository.countBySelleridAndLiked(id, liked));
    }

    @PostMapping("/recommend")
    @Operation(summary = "Add a recommend", description = "Add a recommend. If recommend with provided userid and sellerid exists, throw RecommendAlreadyExistsException", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Recommend> addRecommend(@RequestBody Recommend recommend) {

        if (recommendRepository.existsBySelleridAndUserid(recommend.getSellerid(), recommend.getUserid())) {
            throw new RecommendAlreadyExistsException(recommend.getSellerid(), recommend.getUserid());
        }

        return ResponseEntity.ok(recommendRepository.save(recommend));
    }

    @PutMapping("/recommend/{id}")
    @Operation(summary = "Change recommend to dislike or like", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Recommend> updateRecommend(@RequestBody Recommend recommend, @PathVariable long id) {
        return ResponseEntity.ok(recommendRepository.findById(id).map(oldRecommend -> {
            oldRecommend.setLiked(recommend.isLiked());
            return recommendRepository.save(oldRecommend);
        }).orElseGet(() -> recommendRepository.save(recommend)));
    }

    @DeleteMapping("/recommend/{id}")
    @Operation(summary = "Delete recommend with matching id", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteRecommend(@PathVariable long id) {

        if(!recommendRepository.existsById(id))
            throw new RecommendNotFoundException(id);

        recommendRepository.deleteById(id);

        return ResponseEntity.ok("Recommend deleted");
    }
}
