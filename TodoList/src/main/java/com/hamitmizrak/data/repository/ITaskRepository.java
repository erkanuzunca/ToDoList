package com.hamitmizrak.data.repository;

import com.hamitmizrak.data.entity.CategoryEntity;
import com.hamitmizrak.data.entity.TaskEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ITaskRepository extends CrudRepository<TaskEntity,Long> {

    // Delivered Query (Kendi sorgumu yazdım)
    Optional<TaskEntity> findByTaskName(String taskName);
}
