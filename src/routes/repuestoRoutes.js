import { Router } from 'express'
import { getAll, getById, create } from '../controllers/repuestoController.js'
import { authenticate, authorize } from '../middlewares/authMiddleware.js'

const router = Router()

/**
 * @swagger
 * /repuestos:
 *   get:
 *     summary: Listar todos los repuestos
 *     tags: [Repuestos]
 *     responses:
 *       200:
 *         description: Lista de repuestos
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/', authenticate, getAll)

/**
 * @swagger
 * /repuestos/{id}:
 *   get:
 *     summary: Obtener un repuesto por ID
 *     tags: [Repuestos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Repuesto encontrado
 *       404:
 *         description: Repuesto no encontrado
 */
router.get('/:id', authenticate, getById)


/**
 * @swagger
 * /repuestos:
 *   post:
 *     summary: Crear un nuevo repuesto (solo admin)
 *     tags: [Repuestos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *               - marca
 *               - precio
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: BUJ-001
 *               descripcion:
 *                 type: string
 *                 example: Bujía NGK
 *               marca:
 *                 type: string
 *                 example: Toyota
 *               precio:
 *                 type: number
 *                 example: 1500
 *               stock:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Repuesto creado
 *       400:
 *         description: El código ya existe
 *       403:
 *         description: No tenés permisos para esta acción
 */
router.post('/', authenticate, authorize('admin'), create)


export default router