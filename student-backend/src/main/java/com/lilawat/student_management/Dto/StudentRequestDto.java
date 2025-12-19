package com.lilawat.student_management.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class StudentRequestDto {
    @NotBlank
    private String firstname;

    private String lastname;

    @NotBlank
    @Email
    private String email;

    private String phone;

    private LocalDate dateofbirth;

    @NotBlank
    private String course;
}
