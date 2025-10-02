import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { logger } from './middleware/logger'
import { errorHandler } from './middleware/error'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4001

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(logger)

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'user-service'
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Error handling
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  })
})

app.listen(PORT, () => {
  console.log(`🔐 User Service running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
