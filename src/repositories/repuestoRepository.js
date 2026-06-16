import Repuesto from '../models/Repuesto.js'

const findAll = async (filtros = {}) => {
    return await Repuesto.find(filtros)
    
}

const findById = async (id) => {
    return await Repuesto.findById(id)
    
}

const findByCodigo = async (codigo) => {
    return await Repuesto.findOne({codigo})
    
}

const create = async (nuevoRepuesto) => {
    const repuesto = new Repuesto(nuevoRepuesto)
    return await repuesto.save()
    
}

const updateStock = async (id, cantidad) => {
    return await Repuesto.findByIdAndUpdate(
        id,
        { $inc: { stock: -cantidad } },
        {new: true}

    )
    
}

export { findAll, findById, findByCodigo, create, updateStock }