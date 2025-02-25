package com.SGR.Backend.repository;

import com.SGR.Backend.model.Candidat;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface CandidatRepository extends MongoRepository<Candidat, Integer> {

    Candidat findByEmail(String email);

    boolean existsByEmail(@NotNull String email);
}
