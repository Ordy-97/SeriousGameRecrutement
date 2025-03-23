package com.SGR.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "TestResponse")
@Getter
@Setter
public class TestResponse {

    @Id
    private String id;

    @DBRef
    private Candidat candidat; // Candidat qui passe le test

    @DBRef
    private Test test; // Le test passé

    private Map<String, String> multipleChoiceAnswers; // Clé: ID de la question, Valeur: ID de la réponse choisie
    private Map<String, String> openAnswers; // Clé: ID de la question, Valeur: réponse en texte libre

    private double score;

}
