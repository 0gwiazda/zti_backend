package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


/**
 * Entity for user data from table "allegrouser". Implements {@link UserDetails} methods for JWT Authentication.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="allegrouser")
@Table(name="allegrouser")
public class User implements UserDetails {

    /**
     * Generated user id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * First name of user.
     */
    @Column(name="fname")
    private String fname;


    /**
     * Last name of user.
     */
    @Column(name="lname")
    private String lname;


    /**
     * User email.
     */
    @Column(unique = true, name="email")
    private String email;


    /**
     * User password.
     */
    @Column(name="password")
    private String password;


    /**
     * User address.
     */
    @Column(name="address")
    private String address;


    /**
     * City name for address.
     */
    @Column(name="city")
    private String city;


    /**
     * Post code of address.
     */
    @Column(name="code")
    private String code;


    /**
     * User role. Can be 'USER' or 'ADMIN'.
     */
    @Column(name = "role", columnDefinition = "userrole", insertable = false, updatable = false)
    private String role;

    /**
     *
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    /**
     * Method for {@link UserDetails} interface.
     * Getter for username. In this case email is username.
     * @return
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Method for {@link UserDetails} interface.
     * Is this account non expired.
     * @return true.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Method for {@link UserDetails} interface.
     * Is this account not locked.
     * @return true.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Method for {@link UserDetails} interface.
     * Are credentials for this account non expired.
     * @return true.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Method for {@link UserDetails} interface.
     * Is this account enabled.
     * @return true.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
