#!/bin/bash
# Esperar a que SQL Server inicie
echo "Esperando a que SQL Server esté listo..."
sleep 40

# Ejecutar script de inicio
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P '7J((s&53qG7' -No -i /tmp/script_inicio.sql
