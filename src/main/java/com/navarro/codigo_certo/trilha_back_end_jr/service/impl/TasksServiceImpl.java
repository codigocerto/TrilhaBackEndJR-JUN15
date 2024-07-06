package com.navarro.codigo_certo.trilha_back_end_jr.service.impl;

import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.RequestTask;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.ResponseTask;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;
import com.navarro.codigo_certo.trilha_back_end_jr.repository.TasksRepository;
import com.navarro.codigo_certo.trilha_back_end_jr.service.TasksService;
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
        return null;
    }

    @Override
    public ResponseTask getTaskById(User user, Long id) {
        return null;
    }

    @Override
    public void createTask(User user, RequestTask task) {
    }

    @Override
    public void updateTask(User user, Long id, RequestTask task) {
    }

    @Override
    public void deleteTask(User user, Long id) {
    }
}
