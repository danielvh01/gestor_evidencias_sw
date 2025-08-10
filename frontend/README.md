### ⚙️ Comandos para empaquetar y subir a dockerhub

```bash
docker build -t danielvh01/dicri-react-app:latest .
docker push danielvh01/dicri-react-app:latest
```
---

### ⚙️ Comando para ejecutar contenedor

```bash
docker run -d -p 8080:80 --name dicri-react-app danielvh01/dicri-react-app:latest
```

