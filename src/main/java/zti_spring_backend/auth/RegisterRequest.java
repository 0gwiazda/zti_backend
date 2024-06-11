package zti_spring_backend.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String fname;
    private String lname;
    private String email;
    private String password;
    private String address;
    private String city;
    private String code;


}
