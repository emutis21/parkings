# Parqueaderos

Este es un proyecto [Next.js](https://nextjs.org/) que se conecta a un backend para gestionar parqueaderos.

## Requisitos

- Node.js
- pnpm

## Configuración

- Primero, clonar el repositorio:
  ```bash
  git clone https://github.com/emutis21/parkings.git
  cd parkings
  ```
- Instalar las dependencias:
  ```bash
  pnpm install
  ```

## Configuración del backend

- Crear un archivo `.env` en la raíz del proyecto con la siguiente información:
  ```bash
  PARKINGS_API_URL=http//localhost:8080
  NEXT_PUBLIC_PARKINGS_API_URL=http://localhost:8080
  ```
  Asegurarse de que la URL sea la correcta para el backend.

## Ejecutar el proyecto

- Para ejecutar el proyecto en modo de desarrollo:
  ```bash
  pnpm dev
  ```
- Para construir el proyecto:
  ```bash
  pnpm build
  ```
- Para ejecutar el proyecto en modo de producción:
  ```bash
  pnpm start
  ```


  
