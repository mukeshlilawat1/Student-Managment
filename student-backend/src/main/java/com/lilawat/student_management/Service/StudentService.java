package com.lilawat.student_management.Service;

import com.lilawat.student_management.Dto.StudentRequestDto;
import com.lilawat.student_management.Dto.StudentResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StudentService {
    StudentResponseDto createStudent(StudentRequestDto studentRequestDto);
    StudentResponseDto getStudent(Long id);

    List<StudentResponseDto> getAllStudents();
    StudentResponseDto updateStudent(Long id, StudentRequestDto studentRequestDto);

    void activateStudent(Long id);
    void deleteStudent(Long id);
}
