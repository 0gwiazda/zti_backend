package zti_spring_backend.rest_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.RecommendAlreadyExistsException;
import zti_spring_backend.exception.RecommendNotFoundException;
import zti_spring_backend.model.Recommend;
import zti_spring_backend.repo.RecommendRepository;

import java.util.List;

@RestController
public class RecommendController {

    @Autowired
    RecommendRepository recommendRepository;


    @GetMapping("/auth/recommend")
    public ResponseEntity<List<Recommend>> allRecommend() {
        return ResponseEntity.ok(recommendRepository.findAll());
    }

    
    @GetMapping("/recommend")
    public ResponseEntity<Recommend> getRecommend(@RequestParam long userid, @RequestParam long sellerid) {
        return ResponseEntity.ok(recommendRepository.findBySelleridAndUserid(sellerid, userid).orElse(null));
    }

    @GetMapping("/auth/recommend/seller/{id}")
    public ResponseEntity<Long> getLikedRecommend(@PathVariable long id, @RequestParam boolean liked){
        return ResponseEntity.ok(recommendRepository.countBySelleridAndLiked(id, liked));
    }

    @PostMapping("/recommend")
    public ResponseEntity<Recommend> addRecommend(@RequestBody Recommend recommend) {

        if (recommendRepository.existsBySelleridAndUserid(recommend.getSellerid(), recommend.getUserid())) {
            throw new RecommendAlreadyExistsException(recommend.getSellerid(), recommend.getUserid());
        }

        return ResponseEntity.ok(recommendRepository.save(recommend));
    }

    @PutMapping("/recommend/{id}")
    public ResponseEntity<Recommend> updateRecommend(@RequestBody Recommend recommend, @PathVariable long id) {
        return ResponseEntity.ok(recommendRepository.findById(id).map(oldRecommend -> {
            oldRecommend.setLiked(recommend.isLiked());
            return recommendRepository.save(oldRecommend);
        }).orElseGet(() -> recommendRepository.save(recommend)));
    }

    @DeleteMapping("/recommend/{id}")
    public ResponseEntity<String> deleteRecommend(@PathVariable long id) {

        if(!recommendRepository.existsById(id))
            throw new RecommendNotFoundException(id);

        recommendRepository.deleteById(id);

        return ResponseEntity.ok("Recommend deleted");
    }
}
