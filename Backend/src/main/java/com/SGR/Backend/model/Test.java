package com.SGR.Backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Test")
@Getter
@Setter
public class Test {

    @Id
    private String id;

    @JsonProperty("name")
    @NotNull
    private String name;

    @JsonProperty("createdAt")
    @NotNull
    private Date createdAt;

    @JsonProperty("description")
    private String description;

    @DBRef
    private List<Question> questions;

    @DBRef
    private User createdBy;



}
