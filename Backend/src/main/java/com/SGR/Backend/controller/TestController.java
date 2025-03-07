package com.SGR.Backend.controller;

import com.SGR.Backend.dto.TestDto;
import com.SGR.Backend.model.Test;
import com.SGR.Backend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tests")
public class TestController {

    @Autowired
    private TestService testService;

    /**
     * Endpoint pour créer un test
     */
    @PostMapping
    public ResponseEntity<Test> createTest(@RequestBody TestDto testDto) {
        Test test = testService.createTest(testDto);
        return ResponseEntity.ok(test);
    }

    /**
     * Endpoint pour récupérer tous les tests
     */
    @GetMapping
    public ResponseEntity<List<Test>> getAllTests() {
        return ResponseEntity.ok(testService.getAllTests());
    }

    /**
     * Endpoint pour récupérer un test par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable String id) {
        Optional<Test> test = testService.getTestById(id);
        return test.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Endpoint pour modifier un test
     */
    @PutMapping("/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable String id, @RequestBody TestDto testDto) {
        Optional<Test> updatedTest = testService.updateTest(id, testDto);
        return updatedTest.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    /**
     * Endpoint pour supprimer un test
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable String id) {
        testService.deleteTest(id);
        return ResponseEntity.noContent().build();
    }
}
