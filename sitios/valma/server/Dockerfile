FROM node:22-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
WORKDIR /app
COPY index.html bolsa.html tienda.html empleados.html aviso-privacidad.html valma.css productos-carrusel.js formularios.js images.json logovalma.jpg valma-insumos-web.jpg ./
COPY site-update.js sw.js contacto-flotante.js ./
COPY images ./images
COPY assets ./assets
COPY server/server.js ./server/server.js
ENV NODE_ENV=production PORT=3000
USER node
EXPOSE 3000
CMD ["node", "server/server.js"]
