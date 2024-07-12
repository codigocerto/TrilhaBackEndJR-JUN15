package com.navarro.codigo_certo.trilha_back_end_jr.service.impl;

import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.RequestTask;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.ResponseTask;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.Task;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;
import com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions.NotFound;
import com.navarro.codigo_certo.trilha_back_end_jr.repository.TasksRepository;
import com.navarro.codigo_certo.trilha_back_end_jr.service.TasksService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksServiceImpl implements TasksService {

    private final TasksRepository tasksRepository;

    public TasksServiceImpl(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    @Override
    public List<ResponseTask> getAllTasks(User user) {
        return this.tasksRepository.findAllTasksByUserId(user.getId())
                .stream().map(ResponseTask::toResponseTask)
                .toList();
    }

    @Override
    public ResponseTask getTaskById(User user, Long id) {
        return this.tasksRepository.findTaskByIdAndUserId(id, user.getId())
                .map(ResponseTask::toResponseTask)
                .orElseThrow(() ->
                        new NotFound(String.format("Task with id %s not found!", id))
                );
    }

    @Override
    public void createTask(User user, RequestTask task) {
        Task newTask = new Task();
        newTask.setDescription(task.description());
        newTask.setUser(user);
        this.tasksRepository.save(newTask);
    }

    @Override
    @Transactional
    public void updateTask(User user, Long id, RequestTask request) {
        this.tasksRepository.findTaskByIdAndUserId(id, user.getId())
                .ifPresentOrElse(
                        task -> task.setDescription(request.description()),
                        () -> {
                            throw new NotFound(String.format("Task with id %s not found!", id));
                        }
                );
    }

    @Override
    public void deleteTask(User user, Long id) {
        this.tasksRepository.findTaskByIdAndUserId(id, user.getId())
                .ifPresentOrElse(
                        this.tasksRepository::delete,
                        () -> {
                            throw new NotFound(String.format("Task with id %s not found!", id));
                        }
                );
    }
}
