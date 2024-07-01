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

/**
 * Controller for recommend operations.
 */
@RestController
@Tag(name = "Recommend Controller", description = "Controller for recommendation (likes or dislikes) operations")
public class RecommendController {

    /**
     * Recommend repository described here: {@link zti_spring_backend.repo.RecommendRepository}
     */
    @Autowired
    RecommendRepository recommendRepository;


    /**
     * Endpoint for getting all recommends.
     * @return ResponseEntity with list of recommends and status code 200.
     */
    @GetMapping("/auth/recommend")
    @Operation(summary = "Get all recommends")
    public ResponseEntity<List<Recommend>> allRecommend() {
        return ResponseEntity.ok(recommendRepository.findAll());
    }

    /**
     * Endpoint for getting a recommend posted by user with userid for seller profile with sellerid.
     * User needs to be authenticated for this operation.
     * @param userid id of user.
     * @param sellerid id of seller.
     * @return ResponseEntity with recommend or null and status 200.
     */
    @GetMapping("/recommend")
    @Operation(summary = "Get a recommend posted by user with matching userid under seller with matching sellerid", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Recommend> getRecommend(@RequestParam long userid, @RequestParam long sellerid) {
        return ResponseEntity.ok(recommendRepository.findBySelleridAndUserid(sellerid, userid).orElse(null));
    }

    /**
     * Endpoint for getting count of all likes or dislikes with matching seller id in path.
     * @param id id of seller.
     * @param liked true for counting likes and false for counting dislikes.
     * @return ResponseEntity with count and status code 200.
     */
    @GetMapping("/auth/recommend/seller/{id}")
    @Operation(summary = "Count likes or dislikes for seller with matching sellerid", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Long> getLikedRecommend(@PathVariable long id, @RequestParam boolean liked){
        return ResponseEntity.ok(recommendRepository.countBySelleridAndLiked(id, liked));
    }

    /**
     * Endpoint for posting a recommend.
     * User needs to be authenticated for this operation.
     * If recommend with provided user and seller id exists in database throws {@link zti_spring_backend.exception.RecommendAlreadyExistsException}
     * @param recommend recommend data in RequestBody.
     * @return ResponseEntity with created recommend and status code 200.
     */
    @PostMapping("/recommend")
    @Operation(summary = "Add a recommend", description = "Add a recommend. If recommend with provided userid and sellerid exists, throw RecommendAlreadyExistsException", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Recommend> addRecommend(@RequestBody Recommend recommend) {

        if (recommendRepository.existsBySelleridAndUserid(recommend.getSellerid(), recommend.getUserid())) {
            throw new RecommendAlreadyExistsException(recommend.getSellerid(), recommend.getUserid());
        }

        return ResponseEntity.ok(recommendRepository.save(recommend));
    }

    /**
     * Endpoint for changing a like into a dislike and vice versa.
     * Changes recommend with id provided in path.
     * User needs to be authenticated for this operation.
     * @param recommend recommend data contained in RequestBody.
     * @param id id of recommend.
     * @return ResponseEntity with modified recommend and status code 200.
     */
    @PutMapping("/recommend/{id}")
    @Operation(summary = "Change recommend to dislike or like", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Recommend> updateRecommend(@RequestBody Recommend recommend, @PathVariable long id) {
        return ResponseEntity.ok(recommendRepository.findById(id).map(oldRecommend -> {
            oldRecommend.setLiked(recommend.isLiked());
            return recommendRepository.save(oldRecommend);
        }).orElseGet(() -> recommendRepository.save(recommend)));
    }

    /**
     * Endpoint for deleting a recommend with id provided in path.
     * User needs to be authenticated for this operation.
     * If recommend with this id is not found throws {@link zti_spring_backend.exception.RecommendNotFoundException}
     * @param id id of recommend.
     * @return ResponseEntity with success message and status code 200.
     */
    @DeleteMapping("/recommend/{id}")
    @Operation(summary = "Delete recommend with matching id", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteRecommend(@PathVariable long id) {

        if(!recommendRepository.existsById(id))
            throw new RecommendNotFoundException(id);

        recommendRepository.deleteById(id);

        return ResponseEntity.ok("Recommend deleted");
    }
}
