package zti_spring_backend.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response for resetting user password. Contains a generated password.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetResponse {
    private String password;
}
