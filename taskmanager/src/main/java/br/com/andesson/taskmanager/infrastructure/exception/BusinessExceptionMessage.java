package br.com.andesson.taskmanager.infrastructure.exception;

/**
 * Enumeration of business exception messages used in the application.
 */
public enum BusinessExceptionMessage {

    NOT_FOUND("The instance does not exist in the database."),
    ATTRIBUTE_VALUE_ALREADY_EXISTS("The value of attribute %s is already in use.");

    private final String message;

    BusinessExceptionMessage(String message) {
        this.message = message;
    }

    /**
     * Gets the raw message string associated with the enumeration constant.
     *
     * @return The message string.
     */
    public String getMessage() {
        return message;
    }

    /**
     * Gets a formatted message string indicating that the attribute value is already in use.
     *
     * @param attribute The name of the attribute.
     * @return The formatted message string.
     */
    public String getMessageValueAlreadyExists(String attribute) {
        return String.format(message, attribute);
    }
}
