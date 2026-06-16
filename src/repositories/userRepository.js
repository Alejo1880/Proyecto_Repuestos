import User from '../models/User.js'

const findByEmail = async (email) => { 
    return await User.findOne({ email })
} 

const findById = async (id) => {
    return await User.findById(id)
}

const create = async (nuevoUsuario) => {
    const user = new User(nuevoUsuario)
    return await user.save()
}

export { findByEmail, findById, create } 