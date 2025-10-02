import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'No token provided' 
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
    
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid token' 
      })
    }
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Authentication failed' 
    })
  }
}

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      
      if (process.env.JWT_SECRET) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role
        }
      }
    }
    
    next()
  } catch (error) {
    // Continue without authentication for optional auth
    next()
  }
}
