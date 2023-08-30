package com.hamitmizrak.data.entity;

import com.hamitmizrak.auditing.AuditingAwareBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import java.io.Serializable;

// LOMBOK
@Data
@Log4j2

// ENTITY
@Entity
@Table(name = "tasks")

public class TaskEntity extends AuditingAwareBaseEntity implements Serializable {

    // serileştirme
    public static final Long serialVersionUID = 1L;

    // ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tasks_id",unique = true,nullable = false,insertable = true,updatable = false)
    private Long taskId;

    // TASK NAME
    @Column(name = "tasks_name")
    private String taskName;

    // TASK COMPLETED
    @Column(name = "tasks_completed")
    private boolean taskCompleted;

    public TaskEntity() {
    }
    public TaskEntity(Long taskId, String taskName, boolean taskCompleted) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskCompleted = taskCompleted;
    }
} //end class
