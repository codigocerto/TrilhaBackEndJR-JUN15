package br.com.andesson.taskmanager.domain.status;

/**
 * Enumeration that defines different statuses.
 */
public enum Status {
  PENDING(0), IN_PROGRESS(1), COMPLETED(2);
  
  private final int value;

  /**
   * Private constructor for the Status enumeration.
   *
   * @param value The integer value representing the status.
   */
  private Status(int value) {
      this.value = value;
  }

  /**
   * Get the integer value representing the status.
   *
   * @return The integer value of the status.
   */
  public int getValue() {
      return value;
  }

  /**
   * Get the Status enum from an integer value.
   *
   * @param value The integer value representing the status.
   * @return The Status enum corresponding to the provided value.
   * @throws IllegalArgumentException If the provided value does not correspond to any Status.
   */
  public static Status fromValue(int value) {
      for (Status status : Status.values()) {
          if (status.value == value) {
              return status;
          }
      }
      throw new IllegalArgumentException("Invalid status value: " + value);
  }
}
