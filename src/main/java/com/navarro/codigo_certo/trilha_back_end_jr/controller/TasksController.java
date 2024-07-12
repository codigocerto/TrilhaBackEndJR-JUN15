package com.navarro.codigo_certo.trilha_back_end_jr.controller;

import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.RequestTask;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.ResponseTask;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;
import com.navarro.codigo_certo.trilha_back_end_jr.service.TasksService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tasks")
public class TasksController {

    private final TasksService tasksService;

    public TasksController(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    @GetMapping
    public ResponseEntity<List<ResponseTask>> getAllTasks(@AuthenticationPrincipal User user){
        List<ResponseTask> allTasks = this.tasksService.getAllTasks(user);
        return ResponseEntity.ok().body(allTasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseTask> getTaskById(@AuthenticationPrincipal User user,
                                                    @PathVariable("id") Long id) {
        ResponseTask task = this.tasksService.getTaskById(user, id);
        return ResponseEntity.ok().body(task);
    }

    @PostMapping
    public ResponseEntity<Void> createTask(@AuthenticationPrincipal User user,
                                           @RequestBody RequestTask task) {
        this.tasksService.createTask(user, task);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTask(@AuthenticationPrincipal User user,
                                           @PathVariable("id") Long id,
                                           @RequestBody RequestTask task) {
        this.tasksService.updateTask(user, id, task);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@AuthenticationPrincipal User user,
                                           @PathVariable("id") Long id) {
        this.tasksService.deleteTask(user, id);
        return ResponseEntity.ok().build();
    }
}
