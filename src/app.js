import express from 'express'
import db from './config/database.js'
import authRoutes from './routes/authRoutes.js'


const app = express()

app.use(express.json())
db() // Conecta Base de dato MongoDB

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Servidor en puerto ${PORT}')
})

export default app