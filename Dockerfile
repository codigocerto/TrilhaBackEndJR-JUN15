# Estágio 1: Build da aplicação
FROM node:18-alpine AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos necessários (package.json e package-lock.json)
COPY package*.json ./

COPY swagger_output.json ./

COPY .env.prd ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o TypeScript
RUN npm run build

# Estágio 2: Execução da aplicação
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia apenas os arquivos necessários do primeiro estágio (arquivos compilados JS e as dependências)
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/.env.prd ./
COPY --from=build /app/swagger_output.json ./

# Expõe a porta 8080 (ou a porta que sua aplicação Node.js utiliza)
EXPOSE 8080

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["node", "dist/server.js"]
