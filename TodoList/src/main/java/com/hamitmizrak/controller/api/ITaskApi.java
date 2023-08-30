package com.hamitmizrak.controller.api;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITaskApi<D> {

    // C R U D
    // CREATE
    ResponseEntity<?> taskApiCreate(D d);

    // LIST
    ResponseEntity<List<D>> taskApiList();

    // FIND BY
    ResponseEntity<?> taskApiFindById(Long id);

    // UPDATE
    ResponseEntity<?> taskApiUpdate(Long id, D d);

    // DELETE
    ResponseEntity<?> taskApiDeleteById(Long id);

    //////////////////////////////////////
    // ALL DELETE
    ResponseEntity<String> taskApiAllDelete();

    // SPEED DATA
    ResponseEntity<List<D>> taskApiSpeedData(Long key);
}