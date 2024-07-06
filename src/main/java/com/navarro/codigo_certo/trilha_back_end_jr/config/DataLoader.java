package com.navarro.codigo_certo.trilha_back_end_jr.config;

import com.navarro.codigo_certo.trilha_back_end_jr.entity.Status;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.Task;
import com.navarro.codigo_certo.trilha_back_end_jr.repository.StatusRepository;
import com.navarro.codigo_certo.trilha_back_end_jr.repository.TasksRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataLoader implements CommandLineRunner {

    private final StatusRepository statusRepository;

    public DataLoader(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.insertValuesOfStatusInDb();
    }

    private void insertValuesOfStatusInDb() {
        Arrays.stream(Status.Values.values())
                .map(Status.Values::toStatus)
                .forEach(statusRepository::save);
    }
}
