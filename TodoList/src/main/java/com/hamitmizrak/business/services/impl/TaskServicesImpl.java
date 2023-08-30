package com.hamitmizrak.business.services.impl;

import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.business.dto.TaskDto;
import com.hamitmizrak.business.services.ITaskServices;
import com.hamitmizrak.data.entity.TaskEntity;
import com.hamitmizrak.data.repository.ITaskRepository;
import com.hamitmizrak.exception.HamitMizrakException;
import com.hamitmizrak.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Log4j2
@Service
public class TaskServicesImpl implements ITaskServices<TaskDto, TaskEntity> {

    private final ITaskRepository iTaskRepository;
    private final ModelMapperBean modelMapperBean;

    @Override
    public TaskDto entityToDto(TaskEntity taskEntity) {
        return modelMapperBean.modelMapperMethod().map(taskEntity, TaskDto.class);
    }

    @Override
    public TaskEntity dtoToEntity(TaskDto taskDto) {
        return modelMapperBean.modelMapperMethod().map(taskDto, TaskEntity.class);
    }

    @Override
    @Transactional
    public TaskDto taskServiceCreate(TaskDto taskDto) {
        if (taskDto != null) {
            TaskEntity taskEntity = dtoToEntity(taskDto);
            iTaskRepository.save(taskEntity);
            taskDto.setTaskId(taskEntity.getTaskId());
        } else {
            throw new NullPointerException("TaskDto is null");
        }
        return taskDto;
    }

    @Override
    public List<TaskDto> taskServiceList() {
        Iterable<TaskEntity> entityIterable = iTaskRepository.findAll();
        List<TaskDto> taskDtoList = new ArrayList<>();
        for (TaskEntity entity : entityIterable) {
            TaskDto taskDto = entityToDto(entity);
            taskDtoList.add(taskDto);
        }
        log.info("Number of tasks in the list: " + taskDtoList.size());
        return taskDtoList;
    }

    @Override
    public TaskDto taskServiceFindById(Long id) {
        TaskEntity findTaskEntity = iTaskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + " not found"));
        return entityToDto(findTaskEntity);
    }

    @Override
    @Transactional
    public TaskDto taskServiceUpdate(Long id, TaskDto taskDto) {
        TaskDto taskFindDto = taskServiceFindById(id);
        if (taskFindDto != null) {
            TaskEntity taskEntity = dtoToEntity(taskFindDto);
            taskEntity.setTaskName(taskDto.getTaskName());
            taskEntity.setTaskCompleted(taskDto.isTaskCompleted());
            iTaskRepository.save(taskEntity);
        }
        return taskDto;
    }

    @Override
    @Transactional
    public TaskDto taskServiceDeleteById(Long id) {
        TaskDto taskFindDto = taskServiceFindById(id);
        if (taskFindDto != null) {
            iTaskRepository.deleteById(id);
        }
        return taskFindDto;
    }
}