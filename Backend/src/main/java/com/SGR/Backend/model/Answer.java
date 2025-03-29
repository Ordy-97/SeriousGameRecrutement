package com.SGR.Backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
public class Answer {
//    @Id  // Génère un ID unique pour chaque réponse
    private String id;

    @Field("text") // Indique que ce champ doit être stocké dans MongoDB
    private String text;
}
