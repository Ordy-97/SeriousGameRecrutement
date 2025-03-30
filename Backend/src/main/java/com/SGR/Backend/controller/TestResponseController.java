package com.SGR.Backend.controller;

import com.SGR.Backend.dto.TestResponseDto;
import com.SGR.Backend.model.TestResponse;
import com.SGR.Backend.service.TestResponseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestResponseController {

    @Autowired
    private TestResponseService testResponseService;

    @GetMapping("/allSubmit")
    public List<TestResponse> getAllSubmit() {
        return testResponseService.getAllTestResponses();
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitTest(@Valid @RequestBody TestResponseDto testResponseDto) {
        return ResponseEntity.ok(testResponseService.submitTest(testResponseDto));
    }

}
