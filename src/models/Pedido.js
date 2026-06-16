import mongoose from 'mongoose'

const pedidoSchema = new mongoose.Schema(
    {
          clienteNombre: {
            type: String,
            required: true,
            trim: true
        },
        estado: {
            type: String,
            enum: ['pendiente', 'armado', 'entregado'],
            default: 'pendiente'
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [
            {
                repuesto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Repuesto',
                    required: true
                },
                cantidad: {
                    type: Number,
                    required: true,
                    min: 1
                },
                precioUnitario: {
                    type: Number,
                    required: true,
                    min: 0

                }
            }
        ]
    },
    {timestamps: true}
)

const Pedido = mongoose.model('Pedido', pedidoSchema)

export default Pedido