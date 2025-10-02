import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { logger } from './middleware/logger'
import { errorHandler } from './middleware/error'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4002

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
    service: 'academic-service'
  })
})

// API routes (placeholder)
app.get('/api/students', (req, res) => {
  res.json({ message: 'Students endpoint - coming soon' })
})

app.get('/api/teachers', (req, res) => {
  res.json({ message: 'Teachers endpoint - coming soon' })
})

app.get('/api/courses', (req, res) => {
  res.json({ message: 'Courses endpoint - coming soon' })
})

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
  console.log(`📚 Academic Service running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
