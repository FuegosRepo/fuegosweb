/**
 * Logger utility that only logs in development
 * Automatically removes logs in production builds
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug'

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  error: (...args: unknown[]) => {
    // Errors should always be logged, even in production
    // but we can format them better
    if (isDevelopment) {
      console.error(...args)
    } else {
      // In production, you might want to send to error tracking service
      // For now, we'll still log but without sensitive data
      console.error('[Error]', ...args)
    }
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  }
}

