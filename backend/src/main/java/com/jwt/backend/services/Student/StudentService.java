package com.jwt.backend.services.Student;

import com.jwt.backend.command.CreateStudentCommand;
import com.jwt.backend.dtos.StudentDto;
import java.util.List;

public interface StudentService {
    StudentDto createStudent(CreateStudentCommand command);
    StudentDto getStudentById(Long id);
    StudentDto updateStudent(Long id, CreateStudentCommand command);
    void deleteStudent(Long id);
    List<StudentDto> getAllStudents();
} 