### ⚙️ Comandos para empaquetar y subir a dockerhub

```bash
docker build -t danielvh01/dicri-api:latest .
docker push danielvh01/dicri-api:latest
```
---

### ⚙️ Comando para ejecutar contenedor

```bash
docker run -d -p 4000:4000 --name dicri-api danielvh01/dicri-api:latest
```

