import mongoose from 'mongoose'


const db = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('DB Conectado')
        
    } catch (error) {
        console.error('Error al conectar DB:', error.message)
                
    }
    
}

export default db