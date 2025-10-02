import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { logger } from './middleware/logger'
import { errorHandler } from './middleware/error'
import { authMiddleware } from './middleware/auth'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

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
    service: 'api-gateway'
  })
})

// API routes
app.use('/api/auth', authMiddleware, createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:4001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/api'
  }
}))

app.use('/api/users', authMiddleware, createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:4001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api'
  }
}))

app.use('/api/academic', authMiddleware, createProxyMiddleware({
  target: process.env.ACADEMIC_SERVICE_URL || 'http://localhost:4002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/academic': '/api'
  }
}))

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
  console.log(`🚀 API Gateway running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
})
