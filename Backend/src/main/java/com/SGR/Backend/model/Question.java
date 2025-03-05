package com.SGR.Backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Question")
@Getter
@Setter
public class Question {

    @Id
    private String id;

    @NotBlank
    @NotNull
    @JsonProperty("name")
    private String name;

    @NotNull
    @JsonProperty("questionType")
    private QuestionType type; // Utilisation de l'Enum

    @JsonProperty("answers")
    private List<Answer> answers; // Pour les QCM uniquement

    @JsonProperty("correctAnswerId")
    private String correctAnswerId; // Pour les QCM uniquement
}
