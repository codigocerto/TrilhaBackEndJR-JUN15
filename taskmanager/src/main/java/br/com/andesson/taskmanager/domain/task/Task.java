package br.com.andesson.taskmanager.domain.task;

import java.time.LocalDateTime;
import br.com.andesson.taskmanager.domain.status.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a Task.
 */
@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(of = "id")
public class Task {

    /**
     * Unique identifier for the task.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    /**
     * Name of the task.
     */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /**
     * Status of the task.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    /**
     * Date and time when the task was created.
     */
    @Column(name = "creation_date", nullable = false, updatable = false)
    private LocalDateTime creationDate;

    /**
     * Date and time when the task was last updated.
     */
    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    /**
     * Initializes creation and update dates before persisting.
     */
    @PrePersist
    protected void onCreate() {
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }

    /**
     * Updates the update date before updating.
     */
    @PreUpdate
    protected void onUpdate() {
        this.updateDate = LocalDateTime.now();
    }

    /**
     * Returns a string representation of the task.
     * 
     * @return a string representation of the task.
     */
    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", status=" + status +
                ", creationDate=" + creationDate +
                ", updateDate=" + updateDate +
                '}';
    }
}
