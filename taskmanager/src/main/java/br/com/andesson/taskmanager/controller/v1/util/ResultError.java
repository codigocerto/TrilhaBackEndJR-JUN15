package br.com.andesson.taskmanager.controller.v1.util;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

/**
 * Utility class to extract validation errors from BindingResult.
 */
public class ResultError {

    /**
     * Retrieves validation errors from BindingResult and stores them in a HashMap.
     *
     * @param bindingResult The BindingResult object containing validation errors.
     * @return A HashMap containing validation errors, where the field name is the key and the error message is the value.
     */
    public static Map<String, String> getResultErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        for (FieldError error : bindingResult.getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return errors;
    }
}
