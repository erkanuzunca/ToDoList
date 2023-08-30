package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.TaskDto;
import com.hamitmizrak.business.services.ITaskServices;
import com.hamitmizrak.controller.api.ITaskApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Log4j2

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/task/api/v1")
public class TaskApiImpl implements ITaskApi<TaskDto> {

    private final ITaskServices iTaskServices;

    @Override
    @PostMapping("/create")
    public ResponseEntity<?> taskApiCreate(@Valid @RequestBody TaskDto taskDto) {
        return ResponseEntity.ok(iTaskServices.taskServiceCreate(taskDto));
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<List<TaskDto>> taskApiList() {
        return ResponseEntity.status(HttpStatus.OK).body(iTaskServices.taskServiceList());
    }

    @Override
    @GetMapping("/find/{id}")
    public ResponseEntity<?> taskApiFindById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(iTaskServices.taskServiceFindById(id));
    }

    @Override
    @PutMapping("/update/{id}")
    public ResponseEntity<?> taskApiUpdate(@PathVariable(name = "id") Long id, @Valid @RequestBody TaskDto taskDto) {
        return ResponseEntity.ok().body(iTaskServices.taskServiceUpdate(id, taskDto));
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> taskApiDeleteById(@PathVariable(name = "id") Long id) {
        return new ResponseEntity<>(iTaskServices.taskServiceDeleteById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> taskApiAllDelete() {
        // TODO: Implement this method
        return null;
    }

    @Override
    public ResponseEntity<List<TaskDto>> taskApiSpeedData(Long key) {
        // TODO: Implement this method
        return null;
    }
}