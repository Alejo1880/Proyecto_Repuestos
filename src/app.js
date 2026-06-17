import express from 'express'
import swaggerUi from 'swagger-ui-express'
import db from './config/database.js'
import swaggerSpec from './config/swagger.js'
import authRoutes from './routes/authRoutes.js'
import repuestoRoutes from './routes/repuestoRoutes.js'
import pedidoRoutes from './routes/pedidoRoutes.js'


const app = express()

app.use(express.json())
db() // Conecta Base de dato MongoDB
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/auth', authRoutes)
app.use('/api/repuestos', repuestoRoutes)
app.use('/api/pedidos', pedidoRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})

export default app