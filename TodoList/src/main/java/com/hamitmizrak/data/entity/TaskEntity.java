package com.hamitmizrak.data.entity;

import com.hamitmizrak.auditing.AuditingAwareBaseEntity;
import lombok.Data;
import lombok.extern.log4j.Log4j2;

import jakarta.persistence.*;
import java.io.Serializable;

@Data
@Log4j2
@Entity
@Table(name = "tasks")
public class TaskEntity extends AuditingAwareBaseEntity implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tasks_id", unique = true, nullable = false, insertable = true, updatable = false)
    private Long taskId;

    @Column(name = "tasks_name")
    private String taskName;

    @Column(name = "tasks_completed")
    private boolean taskCompleted;


}