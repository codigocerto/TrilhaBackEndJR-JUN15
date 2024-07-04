# Trilha Back end Jr - Código certo

---

### Escolha de Tecnologia e Arquitetura

Neste desafio de projeto, optei por utilizar Java com Spring devido ao meu maior conhecimento e conforto com essa linguagem.

#### Motivação para Java com Spring

- **Familiaridade:** Java é a linguagem na qual tenho mais conhecimento e experiência, permitindo-me desenvolver com maior eficiência e segurança.
- **Framework Spring:** O Spring oferece uma vasta gama de funcionalidades que facilitam o desenvolvimento de aplicações robustas e escaláveis.

#### Arquitetura Utilizada

Decidi utilizar a arquitetura MVC (Model, View, Controller) por suas vantagens em termos de organização e simplicidade. Embora o projeto não seja muito complexo, a arquitetura MVC mantém o código:

- **Clean:** Facilita a manutenção e a compreensão do código.
- **Modular:** Separa claramente as responsabilidades, melhorando a estrutura e a extensibilidade do projeto.
- **Facilidade de Entendimento:** A sepa


---

### Escolha do Banco de dados

Optei por utilizar o MySQL como banco de dados em vez do SQLite. Esta decisão foi tomada porque pretendo implementar um relacionamento entre tarefas (tasks) e usuários (users), onde cada usuário terá controle de suas próprias tarefas sem interferir nas tarefas de outros usuários.

#### Motivação para o MySQL

- **Relacionamentos:** MySQL oferece um suporte robusto para a criação e manutenção de relacionamentos entre tabelas, algo essencial para gerenciar as associações entre tarefas e usuários de forma eficiente.
- **Escalabilidade:** MySQL é mais adequado para projetos que podem crescer em complexidade e volume de dados, proporcionando uma escalabilidade que o SQLite não oferece tão bem.
- **Desempenho:** Para operações mais complexas e consultas em grandes volumes de dados, o MySQL geralmente oferece um desempenho melhor em comparação com o SQLite.

#### Utilização do Docker Compose

Para evitar a necessidade de instalar o MySQL diretamente no meu computador, utilizei o Docker Compose para criar e gerenciar um contêiner com a imagem do MySQL. Isso oferece diversas vantagens:

- **Isolamento:** O banco de dados roda em um ambiente isolado, evitando conflitos com outros serviços ou configurações no sistema host.
- **Portabilidade:** É fácil replicar o ambiente de desenvolvimento em outras máquinas ou servidores.
- **Facilidade de Configuração:** O Docker Compose permite definir todas as configurações do contêiner em um único arquivo `docker-compose.yml`, facilitando a criação e a manutenção do ambiente de desenvolvimento.

---

### Dependencias

Deixarei listado todas as dependencias usadas nesse projeto e uma breve descrição de cada.

- **Spring Web:** Utilizada para criar e configurar aplicações web, utilizando o servidor embutido Tomcat.
- **Spring JPA:** Utilizada para a integração e manipulação de banco de dados através da especificação Java Persistence API, facilitando o mapeamento objeto-relacional (ORM).
- **Spring Security:** Utilizada para adicionar camadas de segurança à aplicação, fornecendo autenticação e autorização robustas.
- **Driver do MySql:** Necessário para a conexão da aplicação com um banco de dados MySQL. 
- **Driver do H2:** Utilizei o h2 (banco em nuvem) para fazer os testes unitários.
- **JWT (JSON Web Token):** Utilizada para a implementação de autenticação baseada em token. JWTs permitem a transmissão segura de informações entre partes como um objeto JSON, garantindo a integridade e autenticidade dos dados transmitidos.


