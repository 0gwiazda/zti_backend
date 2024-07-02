package zti_spring_backend.rest_api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
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

/**
 * Controller for offer operations.
 */
@RestController
@Tag(name="OfferController", description = "Controller for offer operations")
public class OfferController {

    /**
     * Offer repository described here: {@link zti_spring_backend.repo.OfferRepository}
     */
    @Autowired
    private OfferRepository offerRepository;

    /**
     * Order repository described here: {@link zti_spring_backend.repo.OrderRepository}
     */
    @Autowired
    private OrderRepository orderRepository;

    /**
     * User repository described here: {@link zti_spring_backend.repo.UserRepository}
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Item repository described here: {@link zti_spring_backend.repo.ItemRepository}
     */
    @Autowired
    private ItemRepository itemRepository;

    /**
     * Endpoint for getting all offers.
     * @return ResponseEntity with list of offers and status code 200.
     */
    @GetMapping("/auth/offer")
    @Operation(summary = "Get all offers")
    public ResponseEntity<List<Offer>> getAllOffers() {
        return ResponseEntity.ok(offerRepository.findAll());
    }

    /**
     * Endpoint for getting offer with matching item id provided in path.
     * If offer is not found throws {@link zti_spring_backend.exception.OfferNotFoundException}.
     * @param id id of item.
     * @return ResponseEntity with offer and status code 200.
     */
    @GetMapping("/auth/offer/item/{id}")
    @Operation(summary = "Get an offer with matching itemid provided in path")
    public ResponseEntity<Offer> getOfferByItemId(@PathVariable long id) {
        return ResponseEntity.ok(offerRepository.findByItemid(id).orElseThrow(() -> new OfferNotFoundException(id)));
    }

    /**
     * Endpoint for getting offer with id provided in path.
     * If offer is not found throws {@link zti_spring_backend.exception.OfferNotFoundException}
     * @param id id of offer.
     * @return ResponseEntity with offer and status code 200.
     */
    @GetMapping("/auth/offer/{id}")
    @Operation(summary = "Get an offer with id provided in path")
    public ResponseEntity<Offer> getOfferById(@PathVariable long id) {
        return ResponseEntity.ok(offerRepository.findById(id).orElseThrow(() -> new OfferNotFoundException(id)));
    }

    /**
     * Endpoint for getting all offers with matching seller id provided in path.
     * @param sellerid id of seller.
     * @return ResponseEntity with offer and status code 200.
     */
    @GetMapping("/auth/offer/seller/{sellerid}")
    @Operation(summary = "Get all offers with matching sellerid provided in path")
    public ResponseEntity<List<Offer>> getOffersBySellerid(@PathVariable long sellerid) {
        return ResponseEntity.ok(offerRepository.findBySelleridAvailable(sellerid));
    }

    /**
     * Endpoint for posting an offer.
     * User needs to be authenticated for this operation.
     * If admin tries to create an offer throws {@link zti_spring_backend.exception.AdminException}
     * @param offer offer data contained in RequestBody.
     * @return ResponseEntity with created offer and status code 200.
     */
    @PostMapping("/offer")
    @Operation(summary = "Add an offer", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Offer> addOffer(@RequestBody Offer offer) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));

        if(user.getRole().equals("ADMIN"))
            throw new AdminException("Admin cannot create offers");

        return ResponseEntity.ok(offerRepository.save(offer));
    }

    /**
     * Endpoint for buying items from an offer with id provided in path.
     * Subtracts item count in RequestBody from offers item count.
     * User needs to be authenticated for this operation.
     * If offer is not found throws {@link zti_spring_backend.exception.OfferNotFoundException}
     * If user tries to buy more items than stated in item count throws {@link zti_spring_backend.exception.OfferInvalidItemCountException}
     * If admin tries to buy items from offer throws {@link zti_spring_backend.exception.AdminException}
     * @param id id of offer
     * @param offer offer containing amount of items user wants to buy.
     * @return ResponseEntity with modified offer and status code 200.
     */
    @PutMapping("/offer/buy/{id}")
    @Operation(summary = "Buy item or items from offer", description = "Buys a specified amount of items from offer with id. " +
            "If there are less items in offer than requested, throws OfferInvalidItemCountException.", security = @SecurityRequirement(name = "bearerAuth"))
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

    /**
     * Endpoint for participating in auction with provided id in path.
     * Raises price of offer with provided id to price provided in offer in RequestBody.\
     * User needs to be authenticated for this operation.
     * If offer with this id is not found throws {@link zti_spring_backend.exception.OfferNotFoundException}
     * If offer with this id is not an auction throws {@link zti_spring_backend.exception.OfferInvalidAuctionDataException}
     * If user tries to participate in auction that already ended throws {@link zti_spring_backend.exception.OfferInvalidAuctionOperationException}
     * If item under item id is not found throws {@link zti_spring_backend.exception.ItemNotFoundException}
     * If price is lower or equal to price in offer with provided id throws {@link zti_spring_backend.exception.OfferInvalidPriceException}
     * If admin tries to participate in auction throws {@link zti_spring_backend.exception.AdminException}
     * @param id id of offer.
     * @param newPrice new price for an auction.
     * @param offer offer data in RequestBody.
     * @return ResponseEntity with modified offer and status code 200.
     */
    @PutMapping("/offer/auction/{id}")
    @Operation(summary = "Auction an item from offer", description = "Raise price of an item (therefore participating in auction). " +
            "If auction has ended before changing price, throw OfferInvalidAuctionDataException. If price provided is less than current price, throw OfferInvalidPriceException",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Offer> auctionOffer(@PathVariable long id, @RequestParam long newPrice, @RequestBody Offer offer) {
        var toAuction = offerRepository.findById(id).orElseThrow(() -> new OfferNotFoundException(id));

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        var endDate = LocalDate.parse(toAuction.getEnddate(), formatter);
        var today = LocalDate.now();

        if(!toAuction.isAuction())
            throw new OfferInvalidAuctionDataException(id);
        else if(today.isAfter(endDate))
            throw new OfferInvalidAuctionOperationException(endDate);

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

    /**
     * Endpoint for buying item from auction with provided id in path which user has won.
     * User needs to be authenticated for this operation.
     * If offer with this id is not found throws {@link zti_spring_backend.exception.OfferNotFoundException}
     * If admin tries to buy item from auction throws {@link zti_spring_backend.exception.AdminException}
     * If offer with this id is not an auction throws {@link zti_spring_backend.exception.OfferInvalidAuctionDataException}
     * If user that did not win auction with this id tries to buy item from it throws {@link zti_spring_backend.exception.OfferInvalidAuctionOperationException}
     * @param id id of offer.
     * @param offer offer data in RequestBody.
     * @return
     */
    @PutMapping("/offer/auction/buy/{id}")
    @Operation(summary = "Buy item from offer after auction", description = "Buy item after auction has ended and currently logged user was the winner. " +
            "If user tries to buy item from auction, in which he hasn't won, throws OfferInvalidDataException.", security = @SecurityRequirement(name = "bearerAuth"))
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
            throw new OfferInvalidAuctionOperationException(id, user.getId());

        toBuyAuction.setItemcount(offer.getItemcount());
        toBuyAuction.setAuctionuserid(offer.getAuctionuserid());

        return ResponseEntity.ok(offerRepository.save(toBuyAuction));
    }


    /**
     * Endpoint for deleting offer with provided id in path.
     * User needs to be authenticated for this operation.
     * If offer with this id is not found throws {@link zti_spring_backend.exception.OfferNotFoundException}
     * If user already bought items from this offer throws {@link zti_spring_backend.exception.OfferInvalidDeleteOperationException}
     * @param id id of offer
     * @return ResponseEntity with status code 200.
     */
    @DeleteMapping("/offer/{id}")
    @Operation(summary = "Delete an offer with id provided in path", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Offer> deleteOffer(@PathVariable long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));
        var offer = offerRepository.findById(id).orElseThrow(()->new OfferNotFoundException(id));

        if(user.getId() != offer.getSellerid())
            throw new OfferNotFoundException(id, user.getId());

        if(orderRepository.countByOfferid(id) > 0)
            throw new OfferInvalidDeleteOperationException("Cannot delete an offer with orders.");

        offerRepository.deleteById(id);
        return ResponseEntity.ok(null);
    }
}
