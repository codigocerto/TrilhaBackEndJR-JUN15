package com.navarro.codigo_certo.trilha_back_end_jr.service;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.RequestTask;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks.ResponseTask;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;

import java.util.List;
public interface TasksService {
    List<ResponseTask> getAllTasks(User user);
    ResponseTask getTaskById(User user, Long id);
    void createTask(User user, RequestTask task);
    void updateTask(User user, Long id, RequestTask task);
    void deleteTask(User user, Long id);
}
