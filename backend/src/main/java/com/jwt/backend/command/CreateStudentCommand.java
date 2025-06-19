package com.jwt.backend.command;

import com.jwt.backend.utils.Validatable;
import lombok.*;

import static com.jwt.backend.utils.Assert.assertNotNull;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CreateStudentCommand  implements Validatable {
    private String firstName;
    private String lastName;
    private  String email;
    private Integer age;

    @Override
    public void validate() {
        assertNotNull(email);
    }

} 