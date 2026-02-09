package com.example.userapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;


    @NotBlank(message = "Name is required")
    private String name;
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
    @Pattern(regexp = "\\d{10}", message = "Phone must be 10 digits")
    @NotBlank(message = "Phone Number is Required")
    private String phone;

    public User() {

    }
    public User(String name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }


}
