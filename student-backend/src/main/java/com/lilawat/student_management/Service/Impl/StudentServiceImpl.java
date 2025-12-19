package com.lilawat.student_management.Service.Impl;

import com.lilawat.student_management.Dto.StudentRequestDto;
import com.lilawat.student_management.Dto.StudentResponseDto;
import com.lilawat.student_management.Entity.Student;
import com.lilawat.student_management.Exception.ResourceNotFoundException;
import com.lilawat.student_management.Repository.StudentRepository;
import com.lilawat.student_management.Service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ResourcePatternResolver resourcePatternResolver; // kept as-is

    @Override
    public StudentResponseDto createStudent(StudentRequestDto studentRequestDto) {

        if (studentRepository.existsByEmail(studentRequestDto.getEmail())) {
            throw new RuntimeException("Email Already Exists");
        }

        Student student = Student.builder()
                .firstname(studentRequestDto.getFirstname())
                .lastname(studentRequestDto.getLastname())
                .email(studentRequestDto.getEmail())
                .phone(studentRequestDto.getPhone())
                .dateofbirth(studentRequestDto.getDateofbirth()) // ✅ FIX
                .Course(studentRequestDto.getCourse())           // ✅ FIX
                .active(true)
                .build();

        studentRepository.save(student);
        return mapToDto(student);
    }

    @Override
    public StudentResponseDto getStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));
        return mapToDto(student);
    }

    @Override
    public List<StudentResponseDto> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    @Transactional
    public StudentResponseDto updateStudent(Long id, StudentRequestDto dto) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        if (dto.getFirstname() != null) student.setFirstname(dto.getFirstname());
        if (dto.getLastname() != null) student.setLastname(dto.getLastname());
        if (dto.getEmail() != null) student.setEmail(dto.getEmail());
        if (dto.getPhone() != null) student.setPhone(dto.getPhone());
        if (dto.getCourse() != null) student.setCourse(dto.getCourse());

        if (student.getCourse() == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }

        studentRepository.save(student);
        return mapToDto(student);
    }

    @Override
    public void activateStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));

        if (Boolean.TRUE.equals(student.getActive())) return;

        student.setActive(true);
        studentRepository.save(student);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        student.setActive(false);
        studentRepository.save(student);
    }

    private StudentResponseDto mapToDto(Student student) {
        return StudentResponseDto.builder()
                .id(student.getId())
                .firstname(student.getFirstname())
                .lastname(student.getLastname())
                .email(student.getEmail())
                .phone(student.getPhone())
                .course(student.getCourse())
                .active(student.getActive())
                .build();
    }
}
