package com.jwt.backend.mappers;

import com.jwt.backend.command.CreateStudentCommand;
import com.jwt.backend.dtos.StudentDto;
import com.jwt.backend.entites.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {
    public static StudentDto toDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setAge(student.getAge());
        return dto;
    }

    public static Student toEntity(CreateStudentCommand command) {
        Student student = new Student();
        student.setFirstName(command.getFirstName());
        student.setLastName(command.getLastName());
        student.setEmail(command.getEmail());
        student.setAge(command.getAge());
        return student;
    }

    public static void updateEntity(Student student, CreateStudentCommand command) {
        student.setFirstName(command.getFirstName());
        student.setLastName(command.getLastName());
        student.setEmail(command.getEmail());
        student.setAge(command.getAge());
    }
} 