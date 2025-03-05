package com.SGR.Backend.dto;

import com.SGR.Backend.model.Answer;
import com.SGR.Backend.model.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record QuestionDto(
        @NotBlank @NotNull String name,
        @NotNull QuestionType questionType,
        List<Answer> answers,
        String correctAnswerId
) {}
