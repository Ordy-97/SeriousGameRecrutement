package com.SGR.Backend.dto;

import jakarta.validation.constraints.NotNull;
import java.util.Map;

public record TestResponseDto(
        @NotNull String candidatEmail,
        @NotNull String testId,
        @NotNull Map<String, String> multipleChoiceAnswers,
        @NotNull Map<String, String> openAnswers
) {}
