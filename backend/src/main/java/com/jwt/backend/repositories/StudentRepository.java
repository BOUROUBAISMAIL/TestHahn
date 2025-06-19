package com.jwt.backend.repositories;

import com.jwt.backend.entites.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
} 