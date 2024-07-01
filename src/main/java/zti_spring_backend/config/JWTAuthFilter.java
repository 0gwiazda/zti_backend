package zti_spring_backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Component for filtering JWT tokens.
 */
@Component
@RequiredArgsConstructor
public class JWTAuthFilter extends OncePerRequestFilter {

    /**
     * JWTService described here: {@link zti_spring_backend.config.JwtService}
     */
    private final JwtService jwtService;

    /**
     * UserDetailsService described here: {@link zti_spring_backend.config.ApplicationConfig}
     */
    private final UserDetailsService userDetailsService;


    /**
     * Oveerridden method that filters HTTPRequests for valid JWT tokens.
     * If request contains a valid JWT token in the Authorization header it is set in the SecurityContext.
     * @param request HttpRequest to be filtered.
     * @param response HttpResponse to be filtered.
     * @param filterChain filter chain for passing request and response to the next entity in chain.
     * @throws ServletException if exception occurs during filtering.
     * @throws IOException if I/O exception occurs during filtering.
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String email;

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authorizationHeader.substring(7);
        email =  jwtService.extractUsername(jwtToken);
        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

            if(jwtService.isTokenValid(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                auth.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }
}
