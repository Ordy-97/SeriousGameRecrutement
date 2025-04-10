package com.SGR.Backend.dto;

import jakarta.validation.constraints.NotNull;

public record CandidatDto(
        @NotNull String name,
        @NotNull String email,
        String telephone
) {
}
