import { Router } from 'express'
import { getAll, getById, create, addItem, updateEstado } from '../controllers/pedidoController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = Router()


/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Listar todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', authenticate, getAll)

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', authenticate, getById)

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteNombre
 *             properties:
 *               clienteNombre:
 *                 type: string
 *                 example: Carlos Gómez
 *     responses:
 *       201:
 *         description: Pedido creado
 */
router.post('/', authenticate, create)

/**
 * @swagger
 * /pedidos/{id}/items:
 *   post:
 *     summary: Agregar un repuesto al pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - repuestoId
 *               - cantidad
 *             properties:
 *               repuestoId:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *               cantidad:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item agregado, stock descontado
 *       400:
 *         description: Stock insuficiente
 *       404:
 *         description: Repuesto no encontrado
 */
router.post('/:id/items', authenticate, addItem)

/**
 * @swagger
 * /pedidos/{id}/estado:
 *   patch:
 *     summary: Cambiar el estado de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, armado, entregado]
 *                 example: armado
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Estado inválido
 */
router.patch('/:id/estado', authenticate, updateEstado)

export default router