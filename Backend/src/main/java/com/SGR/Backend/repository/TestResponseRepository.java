package com.SGR.Backend.repository;

import com.SGR.Backend.model.TestResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResponseRepository extends MongoRepository<TestResponse, String> {

    // Méthode personnalisée pour récupérer les réponses d'un test passé par un candidat
    TestResponse findByTestIdAndCandidatId(String testId, String candidatId);

    // Liste toutes les réponses d'un candidat :
    List<TestResponse> findByCandidatId(String candidatId);

    // Récupére les réponses pour un test particulier :
    List<TestResponse> findByTestId(String testId);
}
