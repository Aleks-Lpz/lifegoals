# ETAPA 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos los archivos de configuración de dependencias
COPY package*.json ./
# Instalamos usando legacy-peer-deps para evitar conflictos de versiones con Firebase clásico
RUN npm install --legacy-peer-deps

# Copiamos todo el código del proyecto a la carpeta de trabajo
COPY . .
# Compilamos el proyecto en modo producción
RUN npm run build -- --configuration=production

# ETAPA 2: Distribución (Servidor Nginx de producción)
FROM nginx:alpine
# Copiamos los archivos generados en la Etapa 1 al directorio público de Nginx
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html

# Ajustamos Nginx para que redireccione todas las rutas al index.html (evita errores 404 al recargar páginas en Angular)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
