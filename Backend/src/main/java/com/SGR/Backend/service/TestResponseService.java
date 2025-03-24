package com.SGR.Backend.service;

import com.SGR.Backend.dto.TestResponseDto;
import com.SGR.Backend.model.*;
import com.SGR.Backend.repository.CandidatRepository;
import com.SGR.Backend.repository.TestRepository;
import com.SGR.Backend.repository.TestResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestResponseService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private TestResponseRepository testResponseRepository;

    @Autowired
    private CandidatRepository candidatRepository;

    // Recupère tous les tests effectués
    public List<TestResponse> getAllTestResponses() {
        return testResponseRepository.findAll();
    }

    // Soummission d'un test et calcul du score
    public String submitTest(TestResponseDto testResponseDto) {
        // Vérifier si le test et le candidat existent
        Optional<Test> testOpt = testRepository.findById(testResponseDto.testId());
        Optional<Candidat> candidatOpt = candidatRepository.findByEmail(testResponseDto.candidatEmail());

        if (testOpt.isEmpty() || candidatOpt.isEmpty()) {
            throw new RuntimeException("Test ou Candidat introuvable !");
        }

        Test test = testOpt.get();

        // Vérifier si toutes les questions ont une réponse
        for (Question question : test.getQuestions()) {
            String questionId = question.getId();

            boolean hasMultipleChoiceAnswer = testResponseDto.multipleChoiceAnswers().containsKey(questionId);
            boolean hasOpenAnswer = testResponseDto.openAnswers().containsKey(questionId);

            if (!hasMultipleChoiceAnswer && !hasOpenAnswer) {
                throw new RuntimeException("Toutes les questions doivent être répondues !");
            }
        }

        // Calcul du score basé sur les questions à choix multiples (QCM)
        int totalQuestions = test.getQuestions().size();
        int correctAnswersCount = 0;

        for (Question question : test.getQuestions()) {
            // Calculer uniquement les questions de type QCM
            if (question.getType() == QuestionType.MULTIPLE_CHOICE) {
                String givenAnswerId = testResponseDto.multipleChoiceAnswers().get(question.getId());

                if (givenAnswerId != null && givenAnswerId.equals(question.getCorrectAnswerId())) {
                    correctAnswersCount++;
                }
            }
        }

        // Calcul final du score
        int score = (correctAnswersCount * 100) / totalQuestions;

        // Création de l'objet TestResponse
        TestResponse testResponse = new TestResponse();
        testResponse.setCandidat(candidatOpt.get());
        testResponse.setTest(test);
        testResponse.setMultipleChoiceAnswers(testResponseDto.multipleChoiceAnswers());
        testResponse.setOpenAnswers(testResponseDto.openAnswers());
        testResponse.setScore(score);

        // Enregistrer la réponse du test en base de données
        testResponseRepository.save(testResponse);

        // Retourner le score et un message de confirmation
        return "Test soumis avec succès ! Score obtenu catégorie 'QCM' : " + score + "%";
    }
}
