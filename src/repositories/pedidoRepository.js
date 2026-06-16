import Pedido from '../models/Pedido.js'

const findAll = async () => {
    return await Pedido.find()
        .populate('usuario', 'nombre email')
        .populate('items.repuesto', 'codigo descripcion precio')
    
}

const findById = async (id) => {
    return await Pedido.findById(id)
        .populate('usuario', 'nombre email')
        .populate('items.repuesto', 'codigo descripcion precio')
    
}

const create = async (nuevoPedido) => {
    const pedido = new Pedido(nuevoPedido)
    return await pedido.save()
    
}

const addItem = async (pedidoId, item) => {
    return await Pedido.findByIdAndUpdate(
        pedidoId, 
        {
            $push: {
                items: item
            }
        },
        {new: true}
    )
    
}

const updateEstado = async (id, estado) => {
    return await Pedido.findByIdAndUpdate(
        id,
        { estado },
        {new: true}
    )
    
}

export { findAll, findById, create, addItem, updateEstado }