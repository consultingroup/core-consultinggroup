
FROM node:20-slim AS builder
WORKDIR /app

# Instalar dependencias primero (mejor cache)
COPY package*.json ./

RUN npm ci

# Copiar el resto del código
COPY . .

# Build del proyecto
RUN npm run build

FROM node:20-slim
WORKDIR /app

# Solo copiar package.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar el build desde builder
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Comando de arranque
CMD ["node", "dist/main.js"]