import * as userRepository from '../repositories/userRepository.js'
import { generarToken, hashPassword, comparePassword } from '../utils/auth.js'

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body

    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    const hashedPassword = await hashPassword(password)

    const user = await userRepository.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    })

    const token = generarToken({ id: user._id, rol: user.rol })

    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userRepository.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const token = generarToken({ id: user._id, rol: user.rol })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { register, login }