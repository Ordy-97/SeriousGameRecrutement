package com.SGR.Backend.service;

import com.SGR.Backend.dto.QuestionDto;
import com.SGR.Backend.dto.TestCreationDto;
import com.SGR.Backend.dto.TestDto;
import com.SGR.Backend.model.Question;
import com.SGR.Backend.model.Test;
import com.SGR.Backend.model.User;
import com.SGR.Backend.repository.QuestionRepository;
import com.SGR.Backend.repository.TestRepository;
import com.SGR.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionService questionService;

    /**
     * Crée un nouveau Test */

    public Test createTest(TestDto testDto) {
        Test test = new Test();
        test.setName(testDto.name());
        test.setDescription(testDto.description());
        test.setCreatedAt(testDto.createdAt() != null ? testDto.createdAt() : new Date());

        // Récupération des questions
        /**
        List<Question> questions = new ArrayList<>();
        QuestionRepository questionRepository1 = questionRepository;
        for (String s : testDto.questionIds()) {
            Optional<Question> byId = questionRepository1.findById(s);
            if (byId.isPresent()) {
                Question question = byId.get();
                questions.add(question);
            }
        } */

        List<Question> questions = testDto.questionIds().stream()
                .map(questionRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        test.setQuestions(questions);

        // Récupération du créateur du test
        if (testDto.createdByEmail() != null) {
            Test test1;
            test1 = test;
            User user = userRepository.findUserByEmail(testDto.createdByEmail());
            test1.setCreatedBy(user);
        }

        return testRepository.save(test);
    }

    /**
     * Récupère tous les tests
     */
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    /**
     * Récupère un test par ID
     */
    public Optional<Test> getTestById(String id) {
        return testRepository.findById(id);
    }

    /**
     * Supprime un test
     */
    public void deleteTest(String id) {
        testRepository.deleteById(id);
    }

    /**
     * Modification d'un test
     * */
    public Optional<Test> updateTest(String id, TestDto testDto) {

        return testRepository.findById(id).map(existingTest -> {
            existingTest.setName(testDto.name());
            existingTest.setDescription(testDto.description());

            //recupération des questions
            List<Question> questionsList = new ArrayList<>();
            QuestionRepository questionRepository1 = questionRepository;
            for (String s : testDto.questionIds()) {
                Optional<Question> questionById = questionRepository1.findById(s);
                if (questionById.isPresent()) {
                    Question question = questionById.get();
                    questionsList.add(question);
                }
            }
            existingTest.setQuestions(questionsList);

            // Récupération du créateur du Test
            if(testDto.createdByEmail() != null) {
                User user = userRepository.findUserByEmail(testDto.createdByEmail());
                existingTest.setCreatedBy(user);
            }
            
            return testRepository.save(existingTest);
        });
    }

    public Test createTestWithQuestions(TestCreationDto testCreationDto) {

        // Liste pour stocker les IDs des questions
        List<Question> questions = new ArrayList<>();

        // Boucle pour créer les questions
        for (QuestionDto questionDto : testCreationDto.questions()) {
            Question createdQuestion = questionService.saveQuestion(questionDto);
            questions.add(createdQuestion);
        }

        // Créer le test avec les IDs des questions
        Test test = new Test();
        test.setName(testCreationDto.name());
        test.setDescription(testCreationDto.description());
        test.setCreatedAt(testCreationDto.createdAt());
        test.setQuestions(questions);

        if (testCreationDto.createdByEmail() != null) {
            Test test1;
            test1 = test;
            User user = userRepository.findUserByEmail(testCreationDto.createdByEmail());
            test1.setCreatedBy(user);
        }

        return testRepository.save(test);
    }
}