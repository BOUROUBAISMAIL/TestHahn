package com.jwt.backend.services.Student;

import com.jwt.backend.command.CreateStudentCommand;
import com.jwt.backend.dtos.StudentDto;
import com.jwt.backend.entites.Student;
import com.jwt.backend.exceptions.BusinessException;
import com.jwt.backend.exceptions.ExceptionPayloadFactory;
import com.jwt.backend.repositories.StudentRepository;
import com.jwt.backend.mappers.StudentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    private StudentDto mapToDto(Student student) {
        return StudentMapper.toDto(student);
    }

    private Student mapToEntity(CreateStudentCommand command) {
        return StudentMapper.toEntity(command);
    }

    @Override
    public StudentDto createStudent(CreateStudentCommand command) {
        Student student = mapToEntity(command);
        student = studentRepository.save(student);
        return mapToDto(student);
    }

    @Override
    public StudentDto getStudentById(Long id) {
        Optional<Student> studentOpt = studentRepository.findById(id);
        return studentOpt.map(this::mapToDto).orElseThrow(() -> new BusinessException(ExceptionPayloadFactory.STUDENT_NOT_FOUND.get()));
    }

    @Override
    public StudentDto updateStudent(Long id, CreateStudentCommand command) {
        Optional<Student> studentOpt = studentRepository.findById(id);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            StudentMapper.updateEntity(student, command);
            student = studentRepository.save(student);
            return mapToDto(student);
        }
        throw new BusinessException(ExceptionPayloadFactory.STUDENT_NOT_FOUND.get());
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }
} 