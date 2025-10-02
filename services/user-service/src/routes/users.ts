import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  role: Joi.string().valid('ADMIN', 'TEACHER', 'STUDENT', 'PARENT').optional(),
  isActive: Joi.boolean().optional()
})

// Middleware to verify admin access
const requireAdmin = async (req: Request, res: Response, next: any) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any

    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' })
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Get all users (admin only)
router.get('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, role, isActive } = req.query

    const where: any = {}
    if (role) where.role = role
    if (isActive !== undefined) where.isActive = isActive === 'true'

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.user.count({ where })

    res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user by ID
router.get('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user
router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { error, value } = updateUserSchema.validate(req.body)
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if email is already taken by another user
    if (value.email && value.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: value.email }
      })
      if (emailExists) {
        return res.status(409).json({ error: 'Email already taken' })
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: value,
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Deactivate user
router.patch('/:id/deactivate', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true
      }
    })

    res.json({
      message: 'User deactivated successfully',
      user
    })
  } catch (error) {
    console.error('Deactivate user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Activate user
router.patch('/:id/activate', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await prisma.user.update({
      where: { id },
      data: { isActive: true },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true
      }
    })

    res.json({
      message: 'User activated successfully',
      user
    })
  } catch (error) {
    console.error('Activate user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
