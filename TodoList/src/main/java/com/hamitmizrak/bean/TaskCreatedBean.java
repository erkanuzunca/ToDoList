package com.hamitmizrak.bean;

import com.hamitmizrak.data.repository.ITaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.hamitmizrak.data.entity.TaskEntity;

@Configuration
public class TaskCreatedBean {

    @Autowired
    private ITaskRepository iTaskRepository;

    @Bean
    public CommandLineRunner taskCreateRunner() {
        return args -> {
            // Task Create
            TaskEntity taskEntity = new TaskEntity();
            taskEntity.setTaskName("Sample Task"); // Örnek bir task adı
            taskEntity.setTaskCompleted(false); // Başlangıçta tamamlanmamış olarak ayarla
            // TaskEntity'yi kaydet
            iTaskRepository.save(taskEntity);
            System.out.println("Task created: " + taskEntity);
        };
    }
}