import express from 'express'
import db from './config/database.js'


const app = express()

app.use(express.json())
db() // Conecta Base de dato MongoDB

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Servidor en puerto ${PORT}')
})

export default app