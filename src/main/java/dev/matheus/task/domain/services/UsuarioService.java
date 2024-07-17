package dev.matheus.task.domain.services;

import dev.matheus.task.domain.dtos.UsuarioDTO;
import dev.matheus.task.domain.entities.Usuario;
import dev.matheus.task.domain.repositories.UsuarioRepository;
import dev.matheus.task.exceptions.RecordNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {
    private final UsuarioRepository repository;

    public List<UsuarioDTO> findAll(){
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public void delete(Long id){
        validaDelete(id);
        log.info("Deletando usuário com este ID: " + id);
        repository.deleteById(id);
    }

    public UsuarioDTO update(@Valid Long id, UsuarioDTO user){
        validaUsuario(user);

        String encryptedPassword = new BCryptPasswordEncoder().encode(user.senha());

        Usuario usuario = repository.findById(id).map(recordFound -> {
            recordFound.setUsuario(user.usuario());
            recordFound.setSenha(encryptedPassword);
            return repository.save(recordFound);
        }).orElseThrow(() -> new RecordNotFoundException("Não foi encontrado nenhum usuário com o ID: " + id));

        log.info("Atualizando usuário com o ID:  " + id);
        return this.toDto(usuario);
    }

    private void validaUsuario(UsuarioDTO objDTO) {
        Optional<Usuario> obj = repository.findByUsuario(objDTO.usuario());

        if (obj.isPresent() && !obj.get().getUsuarioId().equals(objDTO.id())) {
            throw new DataIntegrityViolationException("Este usuário já existe no sistema!");
        }
    }

    private void validaDelete(Long id){
        Optional<Usuario> usuario = repository.findById(id);
        if(usuario.isPresent() && usuario.get().getUsuario().equalsIgnoreCase("admin")){
            throw new DataIntegrityViolationException("Usuário administrador não pode ser excluído!");
        }else if(usuario.isEmpty()){
            throw new RecordNotFoundException("Não existe nenhum um usuário com este ID");
        }
    }

    private UsuarioDTO toDto(Usuario usuario) {
        return new UsuarioDTO(usuario.getUsuarioId(), usuario.getUsuario(), usuario.getSenha());
    }
}
