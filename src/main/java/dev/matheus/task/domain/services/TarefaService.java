package dev.matheus.task.domain.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.matheus.task.domain.dtos.TarefaRequestDTO;
import dev.matheus.task.domain.dtos.TarefaResponseDTO;
import dev.matheus.task.domain.entities.Tarefa;
import dev.matheus.task.domain.repositories.TarefaRepository;
import dev.matheus.task.exceptions.RecordNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TarefaService {
    private final TarefaRepository repository;

    private static final String NENHUMA_TAREFA = "Nenhuma tarefa encontrada com ID: ";

    public List<TarefaResponseDTO> findAll(){
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public TarefaResponseDTO create(TarefaRequestDTO tarefaRequestDto){
        Tarefa tarefa = new Tarefa();
        tarefa.setDescricao(tarefaRequestDto.descricao());
        tarefa.setStatus(tarefaRequestDto.status());
        tarefa.setDataCriacao(LocalDateTime.now());
        tarefa.setDataAtualizacao(LocalDateTime.now());

        log.info("Criando nova tarefa com descrição: " + tarefa.getDescricao());

        return this.toDto(repository.save(tarefa));
    }

    public TarefaResponseDTO update(TarefaRequestDTO tarefaRequestDto, Long id){
        Tarefa tarefa = repository.findById(id).map(data -> {
            data.setDescricao(tarefaRequestDto.descricao());
            data.setStatus(tarefaRequestDto.status());
            data.setDataAtualizacao(LocalDateTime.now());
            return repository.save(data);
        }).orElseThrow(() -> new RecordNotFoundException(NENHUMA_TAREFA + id));

        log.info("Atualizando uma tarefa com ID: " + tarefa.getTarefaId());

        return this.toDto(tarefa);
    }

    public void delete(Long id){
        Optional<Tarefa> tarefa = repository.findById(id);
        if(tarefa.isEmpty()) throw new RecordNotFoundException(NENHUMA_TAREFA + id);
        log.info("Excluido uma tarefa com ID: " + tarefa.get().getTarefaId());
        repository.deleteById(id);
    }

    private TarefaResponseDTO toDto(Tarefa tarefa){
        return new TarefaResponseDTO(tarefa.getTarefaId(), tarefa.getDescricao(), tarefa.getStatus(), tarefa.getDataCriacao(), tarefa.getDataAtualizacao());
    }

}
