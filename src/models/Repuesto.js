import mongoose from 'mongoose'

const repuestoSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        descripcion: {
            type: String,
            required: true,
            trim: true
        },
        marca: {
            type: String,
            required: true,
            trim: true
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    },
    {timestamps: true}
)

const Repuesto = mongoose.model('Repuesto', repuestoSchema)

export default Repuesto