package com.SGR.Backend.controller;

import com.SGR.Backend.dto.QuestionDto;
import com.SGR.Backend.model.Question;
import com.SGR.Backend.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/questions")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/{id}")
    public Optional<Question> getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id);
    }


    @PostMapping
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody QuestionDto questionDto) {
        return ResponseEntity.ok(questionService.saveQuestion(questionDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable String id, @Valid @RequestBody QuestionDto questionDto) {
        return questionService.updateQuestion(id, questionDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

}
