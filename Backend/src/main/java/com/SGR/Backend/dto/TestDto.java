package com.SGR.Backend.dto;

import java.util.Date;
import java.util.List;

public record TestDto(
        String name,
        String description,
        Date createdAt,
        List<String> questionIds,
        String createdByEmail
){ }
