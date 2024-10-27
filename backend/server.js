const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware para parsear JSON
app.use(express.json());

// Define tus rutas aquí...

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
