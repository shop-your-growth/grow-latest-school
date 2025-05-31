// 🏥 GROW YouR NEED - Health Check API Endpoint
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: await checkDatabase(),
        auth: await checkAuth(),
        api: 'operational'
      },
      performance: {
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage()
      }
    }

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}

async function checkDatabase(): Promise<string> {
  try {
    // Add your database connection check here
    // For now, we'll simulate a check
    return 'operational'
  } catch (error) {
    return 'error'
  }
}

async function checkAuth(): Promise<string> {
  try {
    // Add your auth service check here
    // For now, we'll simulate a check
    return 'operational'
  } catch (error) {
    return 'error'
  }
}
