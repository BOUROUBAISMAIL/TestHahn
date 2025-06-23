package com.jwt.backend.services.Student;

import com.jwt.backend.command.CreateStudentCommand;
import com.jwt.backend.dtos.StudentDto;
import com.jwt.backend.entites.Student;
import com.jwt.backend.exceptions.BusinessException;
import com.jwt.backend.exceptions.ExceptionPayloadFactory;
import com.jwt.backend.repositories.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceImplTest {
    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService;

    private Student student;
    private StudentDto studentDto;
    private CreateStudentCommand command;

    @BeforeEach
    void setUp() {
        student = Student.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .age(20)
                .build();
        studentDto = new StudentDto(1L, "John", "Doe", "john.doe@example.com", 20);
        command = new CreateStudentCommand("John", "Doe", "john.doe@example.com", 20);
    }

    @Test
    void createStudent_success() {
        when(studentRepository.save(any(Student.class))).thenReturn(student);
        StudentDto result = studentService.createStudent(command);
        assertEquals(studentDto.getFirstName(), result.getFirstName());
        assertEquals(studentDto.getLastName(), result.getLastName());
        assertEquals(studentDto.getEmail(), result.getEmail());
        assertEquals(studentDto.getAge(), result.getAge());
    }

    @Test
    void getStudentById_success() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        StudentDto result = studentService.getStudentById(1L);
        assertEquals(studentDto.getFirstName(), result.getFirstName());
    }

    @Test
    void getStudentById_notFound() {
        when(studentRepository.findById(1L)).thenReturn(Optional.empty());
        BusinessException ex = assertThrows(BusinessException.class, () -> studentService.getStudentById(1L));
        assertEquals(ExceptionPayloadFactory.STUDENT_NOT_FOUND.get().getMessage(), ex.getPayload().getMessage());
    }

    @Test
    void updateStudent_success() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(studentRepository.save(any(Student.class))).thenReturn(student);
        StudentDto result = studentService.updateStudent(1L, command);
        assertEquals(studentDto.getFirstName(), result.getFirstName());
    }

    @Test
    void updateStudent_notFound() {
        when(studentRepository.findById(1L)).thenReturn(Optional.empty());
        BusinessException ex = assertThrows(BusinessException.class, () -> studentService.updateStudent(1L, command));
        assertEquals(ExceptionPayloadFactory.STUDENT_NOT_FOUND.get().getMessage(), ex.getPayload().getMessage());
    }

    @Test
    void deleteStudent_success() {
        doNothing().when(studentRepository).deleteById(1L);
        assertDoesNotThrow(() -> studentService.deleteStudent(1L));
        verify(studentRepository, times(1)).deleteById(1L);
    }

    @Test
    void getAllStudents_success() {
        when(studentRepository.findAll()).thenReturn(Arrays.asList(student));
        List<StudentDto> result = studentService.getAllStudents();
        assertEquals(1, result.size());
        assertEquals(studentDto.getFirstName(), result.get(0).getFirstName());
    }
} 