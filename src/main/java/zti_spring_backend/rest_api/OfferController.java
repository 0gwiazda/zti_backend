package zti_spring_backend.rest_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.*;
import zti_spring_backend.model.Offer;
import zti_spring_backend.repo.ItemRepository;
import zti_spring_backend.repo.OfferRepository;
import zti_spring_backend.repo.OrderRepository;
import zti_spring_backend.repo.UserRepository;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
public class OfferController {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/auth/offer")
    public ResponseEntity<List<Offer>> getAllOffers() {
        return ResponseEntity.ok(offerRepository.findAll());
    }

    @GetMapping("/auth/offer/item/{id}")
    public ResponseEntity<Offer> getOfferByItemId(@PathVariable long id) {
        return ResponseEntity.ok(offerRepository.findByItemid(id).orElseThrow(() -> new OfferNotFoundException(id)));
    }

    @GetMapping("/auth/offer/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable long id) {
        return ResponseEntity.ok(offerRepository.findById(id).orElseThrow(() -> new OfferNotFoundException(id)));
    }

    @GetMapping("/auth/offer/seller/{sellerid}")
    public ResponseEntity<List<Offer>> getOffersBySellerid(@PathVariable long sellerid) {
        return ResponseEntity.ok(offerRepository.findBySelleridAvailable(sellerid));
    }

    @PostMapping("/offer")
    public ResponseEntity<Offer> addOffer(@RequestBody Offer offer) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));

        if(user.getRole().equals("ADMIN"))
            throw new AdminException("Admin cannot create offers");

        return ResponseEntity.ok(offerRepository.save(offer));
    }

    @PutMapping("/offer/buy/{id}")
    public ResponseEntity<Offer> buyOffer(@PathVariable long id, @RequestBody Offer offer) {
        var toBuy = offerRepository.findById(id).orElseThrow(() -> new OfferNotFoundException(id));

        if(toBuy.getItemcount() - offer.getItemcount() < 0)
            throw new OfferInvalidItemCountException(id, toBuy.getItemcount());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));

        if(user.getRole().equals("ADMIN"))
            throw new AdminException("Admin cannot buy auctions");

        toBuy.setItemcount(toBuy.getItemcount() - offer.getItemcount());

        return ResponseEntity.ok(offerRepository.save(toBuy));
    }

    @PutMapping("/offer/auction/{id}")
    public ResponseEntity<Offer> auctionOffer(@PathVariable long id, @RequestParam long newPrice, @RequestBody Offer offer) {
        var toAuction = offerRepository.findById(id).orElseThrow(() -> new OfferNotFoundException(id));

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        var endDate = LocalDate.parse(toAuction.getEnddate(), formatter);
        var today = LocalDate.now();

        if(!toAuction.isAuction())
            throw new OfferInvalidAuctionDataException(id);
        else if(today.isAfter(endDate))
            throw new OfferInvalidAuctionDataException(endDate);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();
        var user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));

        if(user.getRole().equals("ADMIN"))
            throw new AdminException("Admin cannot participate in auctions");

        toAuction.setAuctionuserid(user.getId());
        var item = itemRepository.findById(toAuction.getItemid()).orElseThrow(() -> new ItemNotFoundException(toAuction.getItemid()));

        if(item.getPrice() >= newPrice)
            throw new OfferInvalidPriceException(id, item.getPrice());

        item.setPrice(newPrice);
        itemRepository.save(item);

        return ResponseEntity.ok(offerRepository.save(toAuction));
    }

    @PutMapping("/offer/auction/buy/{id}")
    public ResponseEntity<Offer> buyOfferFromAuction(@PathVariable long id, @RequestBody Offer offer)
    {
        var toBuyAuction = offerRepository.findById(id).orElseThrow(() -> new OfferNotFoundException(id));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));

        if(user.getRole().equals("ADMIN"))
            throw new AdminException("Admin cannot buy auctions");

        if(!toBuyAuction.isAuction())
            throw new OfferInvalidAuctionDataException(id);
        else if(toBuyAuction.getAuctionuserid() != user.getId())
            throw new OfferInvalidAuctionDataException(id, user.getId());

        toBuyAuction.setItemcount(offer.getItemcount());
        toBuyAuction.setAuctionuserid(offer.getAuctionuserid());

        return ResponseEntity.ok(offerRepository.save(toBuyAuction));
    }


    @DeleteMapping("/offer/{id}")
    public ResponseEntity<Offer> deleteOffer(@PathVariable long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));
        var offer = offerRepository.findById(id).orElseThrow(()->new OfferNotFoundException(id));

        if(user.getId() != offer.getSellerid())
            throw new OfferNotFoundException(id, user.getId());

        offerRepository.deleteById(id);
        return ResponseEntity.ok(null);
    }
}
