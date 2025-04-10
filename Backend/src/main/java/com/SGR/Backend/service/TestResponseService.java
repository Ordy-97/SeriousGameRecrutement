package com.SGR.Backend.service;

import com.SGR.Backend.dto.TestResponseDto;
import com.SGR.Backend.model.*;
import com.SGR.Backend.repository.CandidatRepository;
import com.SGR.Backend.repository.TestRepository;
import com.SGR.Backend.repository.TestResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        Optional<Candidat> candidatOpt = candidatRepository.findByEmail(testResponseDto.candidat().email());
        System.out.println(candidatOpt);

        if(!candidatOpt.isEmpty()){
            Candidat candidat = candidatOpt.get();
            // Vérifier si le candidat a déjà soumis le test
            if (candidat.getTestResponses().stream().anyMatch(tr -> tr.getTest().getId().equals(testResponseDto.testId()))) {
                throw new RuntimeException("Le candidat a déjà soumis ce test !");
            }
        }else {
            // Si le candidat n'existe pas, on le crée
            Candidat newCandidat = new Candidat();
            newCandidat.setName(testResponseDto.candidat().name());
            newCandidat.setEmail(testResponseDto.candidat().email());
            newCandidat.setTelephone(testResponseDto.candidat().telephone());
            candidatOpt = Optional.of(newCandidat);
            candidatRepository.save(newCandidat);
        }

        if (testOpt.isEmpty()) {
            throw new RuntimeException("Test introuvable !");
        }

        Test test = testOpt.get();

        // Vérifier si toutes les questions ont une réponse
        for (Question question : test.getQuestions()) {
            String questionId = question.getId();

            boolean hasMultipleChoiceAnswer = testResponseDto.multipleChoiceAnswers().containsKey(questionId);

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
        testResponse.setDateSoumission(new Date());

        // Enregistrer la réponse du test en base de données
        testResponseRepository.save(testResponse);

        // Retourner le score et un message de confirmation
        return "Test soumis avec succès ! Score obtenu catégorie 'QCM' : " + score + "%";
    }
}
