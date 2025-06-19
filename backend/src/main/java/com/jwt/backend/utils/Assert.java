package com.jwt.backend.utils;

import com.jwt.backend.exceptions.BusinessException;
import com.jwt.backend.exceptions.ExceptionPayload;
import com.jwt.backend.exceptions.ExceptionPayloadFactory;



public class Assert {

    private static final ExceptionPayload payload = ExceptionPayloadFactory.INVALID_PAYLOAD.get();

    private Assert() {
        throw new IllegalStateException();
    }

    public static void assertNotNull(Object value) {
        if (value == null) {
            throw new BusinessException(payload);
        }
    }


}
