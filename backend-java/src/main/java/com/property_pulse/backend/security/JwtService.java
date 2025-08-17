package com.property_pulse.backend.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class JwtService {

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    @Value("${JWT_EXPIRATION}")
    private long jwtExpiration;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        long currentTime = System.currentTimeMillis();
        Date issuedAt = new Date(currentTime);
        Date expiresAt = new Date(currentTime + jwtExpiration);
        
        log.info("Generating JWT token for user: {} with expiration: {} (duration: {}ms)", 
                 userDetails.getUsername(), expiresAt, jwtExpiration);
        
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiresAt)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            boolean isValid = (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
            
            if (!isValid) {
                if (isTokenExpired(token)) {
                    log.warn("Token is expired for user: {}", username);
                } else {
                    log.warn("Token username mismatch. Token: {}, UserDetails: {}", 
                             username, userDetails.getUsername());
                }
            }
            
            return isValid;
        } catch (Exception e) {
            log.error("Error validating token: {}", e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            Date expiration = extractExpiration(token);
            Date now = new Date();
            boolean expired = expiration.before(now);
            
            if (expired) {
                log.debug("Token expired at: {}, current time: {}", expiration, now);
            }
            
            return expired;
        } catch (Exception e) {
            log.error("Error checking token expiration: {}", e.getMessage());
            return true; // Consider expired if we can't parse
        }
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            log.error("Error parsing JWT claims: {}", e.getMessage());
            throw e;
        }
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}