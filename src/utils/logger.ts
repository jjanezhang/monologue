/**
 * Logger utility for consistent logging across the app
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// Set this to control the minimum log level that should be output
// In production, you might want to set this to 'warn' or 'error'
const MIN_LOG_LEVEL: LogLevel = __DEV__ ? 'debug' : 'warn'

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

/**
 * Determines if a log level should be shown based on the minimum level
 */
const shouldLog = (level: LogLevel): boolean => {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LOG_LEVEL]
}

/**
 * Format the log message with timestamp and additional context
 */
const formatMessage = (
  message: string,
  context?: Record<string, any>,
): string => {
  const timestamp = new Date().toISOString()
  const contextString = context ? ` | ${JSON.stringify(context)}` : ''
  return `[${timestamp}]${contextString} ${message}`
}

/**
 * Logger object with methods for different log levels
 */
export const logger = {
  debug(message: string, context?: Record<string, any>): void {
    if (shouldLog('debug')) {
      console.debug(formatMessage(message, context))
    }
  },

  info(message: string, context?: Record<string, any>): void {
    if (shouldLog('info')) {
      console.info(formatMessage(message, context))
    }
  },

  warn(message: string, context?: Record<string, any>): void {
    if (shouldLog('warn')) {
      console.warn(formatMessage(message, context))
    }
  },

  error(message: string, error?: any, context?: Record<string, any>): void {
    if (shouldLog('error')) {
      console.error(formatMessage(message, context))
      if (error) {
        console.error(error)
      }
    }
  },
}
