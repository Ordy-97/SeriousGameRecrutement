package com.SGR.Backend.service;

import com.SGR.Backend.dto.QuestionDto;
import com.SGR.Backend.model.Question;
import com.SGR.Backend.repository.QuestionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    public Question saveQuestion(@Valid QuestionDto questionDto) {
        Question question = new Question();
        question.setName(questionDto.name());
        question.setType(questionDto.questionType());
        question.setAnswers(questionDto.answers());
        question.setCorrectAnswerId(questionDto.correctAnswerId());

        return questionRepository.save(question);
    }

    public Optional<Question> updateQuestion(String id, @Valid QuestionDto questionDto) {
        return questionRepository.findById(id).map(existingQuestion -> {
            existingQuestion.setName(questionDto.name());
            existingQuestion.setType(questionDto.questionType());
            existingQuestion.setAnswers(questionDto.answers());
            existingQuestion.setCorrectAnswerId(questionDto.correctAnswerId());

            return questionRepository.save(existingQuestion);
        });
    }

    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }

}
