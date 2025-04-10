package com.SGR.Backend.dto;

import jakarta.validation.constraints.NotNull;
import java.util.Map;

public record TestResponseDto(
        @NotNull CandidatDto candidat,
        @NotNull String testId,
        Map<String, String> multipleChoiceAnswers,
        Map<String, String> openAnswers
) {}
