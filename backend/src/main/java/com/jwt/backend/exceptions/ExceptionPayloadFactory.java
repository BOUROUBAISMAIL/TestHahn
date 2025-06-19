package com.jwt.backend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionPayloadFactory {

    STUDENT_NOT_FOUND(0, HttpStatus.NOT_FOUND, "user.not.found"),
    INVALID_PAYLOAD(1, HttpStatus.BAD_REQUEST, "invalid.payload");
    private final Integer code;
    private final HttpStatus status;
    private final String message;

    public ExceptionPayload get() {
        return new ExceptionPayload(code, status, message);
    }

}
