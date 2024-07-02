package zti_spring_backend.config;


import jakarta.servlet.Filter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;


/**
 * Security Configuration describing, which endpoints need authentication.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /**
     * JWT authentication filter described here: {@link zti_spring_backend.config.JWTAuthFilter}
     */
    private final JWTAuthFilter jwtAuthFilter;

    /**
     * Authentication provider described here: {@link zti_spring_backend.config.ApplicationConfig}
     */
    private final AuthenticationProvider authenticationProvider;

    /**
     * Method for configuring the security filter chain for http requests.
     * It disables authentication for endpoints beginning with "/auth/**" and for all OpenApi endpoints.
     * @param http the {@link HttpSecurity} to configure.
     * @return the configured {@link SecurityFilterChain}.
     * @throws Exception if an exception occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(@NonNull HttpSecurity http) throws Exception
    {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auths -> auths
                        .requestMatchers("/auth/**", "/configuration/**",
                                "/swagger*/**",
                                "/swagger-ui/**",
                                "/webjars/**", "/v3/api-docs/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
}
