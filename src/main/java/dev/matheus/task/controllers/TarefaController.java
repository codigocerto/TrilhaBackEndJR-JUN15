package dev.matheus.task.controllers;

import dev.matheus.task.domain.dtos.TarefaRequestDTO;
import dev.matheus.task.domain.dtos.TarefaResponseDTO;
import dev.matheus.task.domain.services.TarefaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Tarefa", description = "Tarefa API")
@RequestMapping("/tarefa")
public class TarefaController {
    private final TarefaService service;

    @GetMapping
    public ResponseEntity<List<TarefaResponseDTO>> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }

    @PostMapping
    public ResponseEntity<TarefaResponseDTO> create(@RequestBody TarefaRequestDTO tarefaRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(tarefaRequestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> update(@RequestBody TarefaRequestDTO tarefaRequestDto, @PathVariable Long id){
        return ResponseEntity.ok().body(service.update(tarefaRequestDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
