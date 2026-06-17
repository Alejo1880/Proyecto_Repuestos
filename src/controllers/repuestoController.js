import * as repuestoRepository from '../repositories/repuestoRepository.js'


const getAll = async (req, res) => {
    try {
        const repuestos = await repuestoRepository.findAll()
        res.status(200).json(repuestos)
    } catch (error) { 
        res.status(500).json({ message: error.message })
    }
    
}

const getById = async (req, res) => {
    try {
        const repuesto = await repuestoRepository.findById(req.params.id)
        if (!repuesto) { 
            return res.status(404).json({ message: 'No se encontro el repuesto solicitado'})
        }
        res.status(200).json(repuesto)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

const create = async (req, res) => {
    try {
        const existing = await repuestoRepository.findByCodigo(req.body.codigo)
        if (existing) { 
            return res.status(400).json({ message: 'Ya existe el codigo' })
        }
        const repuesto = await repuestoRepository.create(req.body)
        res.status(201).json(repuesto)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

export { getAll, getById, create }