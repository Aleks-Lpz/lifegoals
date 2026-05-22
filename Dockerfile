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
# ETAPA 2: Distribución (Servidor Nginx de producción)
FROM nginx:alpine

# Usamos un comodín para copiar el contenido sin importar si la estructura varía ligeramente
COPY --from=build /app/dist/lifegoals/browser/ /usr/share/nginx/html/

# Si lo de arriba fallara por la jerarquía de Angular, la alternativa es:
# COPY --from=build /app/dist/lifegoals/ /usr/share/nginx/html/

# Ajustamos Nginx para que redireccione todas las rutas al index.html
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
