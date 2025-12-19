package com.lilawat.student_management.Controller;

import com.lilawat.student_management.Dto.StudentRequestDto;
import com.lilawat.student_management.Dto.StudentResponseDto;
import com.lilawat.student_management.Service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public StudentResponseDto createStudent(
            @Valid @RequestBody StudentRequestDto studentRequestDto
    ) {
        return studentService.createStudent(studentRequestDto);
    }

    @GetMapping("/{id}")
    public StudentResponseDto getStudent(@PathVariable Long id) {
        return studentService.getStudent(id);
    }

    @GetMapping
    public List<StudentResponseDto> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PutMapping("/{id}")
    public StudentResponseDto updateStudent(
            @PathVariable Long id,
            @RequestBody StudentRequestDto studentRequestDto   // 👈 THIS WAS MISSING
    ) {
        return studentService.updateStudent(id, studentRequestDto);
    }


    @PutMapping("/{id}/activate")
    public String activateStudent(@PathVariable Long id) {
        studentService.activateStudent(id);
        return "Student activated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
}
