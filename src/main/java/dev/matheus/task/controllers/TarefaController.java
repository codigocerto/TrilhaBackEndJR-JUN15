package dev.matheus.task.controllers;

import dev.matheus.task.domain.dtos.TarefaRequestDTO;
import dev.matheus.task.domain.dtos.TarefaResponseDTO;
import dev.matheus.task.domain.services.TarefaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Tarefas", description = "Rotas das Tarefas")
@RequestMapping("/tarefa")
public class TarefaController {
    private final TarefaService service;

    @GetMapping
    @Operation(summary = "Lista todas as tarefas", description = "Lista todas as tarefas cadastradas no banco de dados")
    public ResponseEntity<List<TarefaResponseDTO>> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }

    @PostMapping
    @Operation(summary = "Cria uma nova tarefa", description = "Cria uma nova tarefa com as informações passadas no corpo da requisição, onde o Status pode ser 'PENDENTE', 'CONCLUIDO' ou 'CANCELADO'")
    public ResponseEntity<TarefaResponseDTO> create(@RequestBody TarefaRequestDTO tarefaRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(tarefaRequestDto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma tarefa", description = "Atualiza uma tarefa com as informações passadas no corpo da requisição, onde o Status pode ser 'PENDENTE', 'CONCLUIDO' ou 'CANCELADO'")
    public ResponseEntity<TarefaResponseDTO> update(@RequestBody TarefaRequestDTO tarefaRequestDto, @PathVariable Long id){
        return ResponseEntity.ok().body(service.update(tarefaRequestDto, id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma tarefa", description = "Deleta uma tarefa com base no ID passado na URL")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
