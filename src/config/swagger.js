import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Repuestos de Autos',
      version: '1.0.0',
      description: 'API REST para gestión de pedidos en una casa de repuestos de autos'
    },
    servers: [
  {
    url: 'https://proyecto-repuestos.onrender.com/api',
    description: 'Servidor de producción'
  },
  {
    url: 'http://localhost:3000/api',
    description: 'Servidor de desarrollo'
  }
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec