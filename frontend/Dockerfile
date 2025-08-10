# Etapa 1: Build del front
FROM node:20.14.0-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:stable-alpine

# Elimina configuración por defecto y copia la nuestra (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build generado por React
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]