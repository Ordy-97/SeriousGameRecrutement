package com.SGR.Backend.dto;

import java.util.Date;
import java.util.List;

public record TestCreationDto(
        String name,
        String description,
        Date createdAt,
        List<QuestionDto> questions,
        String createdByEmail) {
}
