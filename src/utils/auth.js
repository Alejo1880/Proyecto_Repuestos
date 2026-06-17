import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generarToken = (payload) => { 
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const verifyToken = (token) => { 
    return jwt.verify(token, process.env.JWT_SECRET)
} 

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}


export { generarToken, verifyToken, hashPassword, comparePassword}