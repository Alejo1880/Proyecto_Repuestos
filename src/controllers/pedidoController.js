import * as pedidoRepository from '../repositories/pedidoRepository.js'
import * as repuestoRepository from '../repositories/repuestoRepository.js'

const getAll = async (req, res) => {
    try {
        const pedidos = await pedidoRepository.findAll()
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

const getById = async (req, res) => {
    try {
        const pedido = await pedidoRepository.findById(req.params.id)
        if (!pedido) { 
            return res.status(404).json({ message: 'No se encontro el pedido' })
        }
        res.status(200).json(pedido)
    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
    
}

const create = async (req, res) => {
    try {
        const { clienteNombre } = req.body
        const pedido = await pedidoRepository.create({
            clienteNombre,
            usuario: req.user.id,
            items: []
        })
        res.status(201).json(pedido)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

const addItem = async (req, res) => {
    try {
        const { repuestoId, cantidad } = req.body
        const repuesto = await repuestoRepository.findById(repuestoId)
        if (!repuesto) {
            return res.status(404).json({ message: 'No se encontro el repuesto' })
        }

        if (repuesto.stock < cantidad) { 
            return res.status(400).json({ message: 'No stock suficiente' })
        }

        const item = {
            repuesto: repuesto._id,
            cantidad,
            precioUnitario: repuesto.precio
        }

        const pedido = await pedidoRepository.addItem(req.params.id, item)
        await repuestoRepository.updateStock(repuestoId, cantidad)

        res.status(200).json(pedido)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

const updateEstado = async (req, res) => {
    try {
        const { estado } = req.body
        const estadosValidos = ['pendiente', 'armado', 'entregado']

        if (!estadosValidos.includes(estado)) { 
            return res.status(400).json({message: 'No es un estado valido'})
        }
        const pedido = await pedidoRepository.updateEstado(req.params.id, estado)
        if (!pedido) { 
            return res.status(404).json({ message: 'No se encontro el pedido' })
        }

        res.status(500).json({ message: error.message })
        
    } catch (error) {
        
    }
    
}

export { getAll, getById, create, addItem, updateEstado }