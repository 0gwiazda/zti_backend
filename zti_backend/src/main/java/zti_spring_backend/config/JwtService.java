package zti_spring_backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service for processing and generating JWT tokens.
 */
@Service
public class JwtService {

    private static final String secret = "YmJUphWuF9PHM5NG/S047E3VGuCIm29qCw1vkppDim0yqGJdG3DfGfoiN6MUbrkN";

    /**
     * Method for extracting username from JWT token.
     * @param token JWT token to be processed.
     * @return username extracted from token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Generic method for extracting a single claim from JWT token.
     * @param token JWT token to be processed.
     * @param claimsResolver function that resolves a specific claim from the token {@link Claims}.
     * @return claim of type T.
     * @param <T> type of claim.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Function for generating JWT tokens.
     * @param claims claims to be added to the token.
     * @param userDetails userDetails returning username (email).
     * @return JWT token.
     */
    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {

        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Function for checking if JWT token is valid
     * @param token token to be validated.
     * @param userDetails userDetails containing username (email).
     * @return true if token is valid, otherwise false.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()));
    }

    /**
     * Function for extracting all claims from JWT token.
     * @param token to be processed.
     * @return all claims from token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Function for getting JWT token signing key.
     * @return signing key.
     */
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
