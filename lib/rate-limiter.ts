import { NextRequest, NextResponse } from 'next/server'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}

/**
 * In-memory rate limiter for API routes.
 * Returns null if allowed, or a NextResponse with 429 if rate limited.
 */
export function rateLimit(
  request: NextRequest,
  { maxRequests = 3, windowMs = 60_000 }: { maxRequests?: number; windowMs?: number } = {}
): NextResponse | null {
  cleanup()

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const key = `${ip}:${request.nextUrl.pathname}`
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return null
  }

  entry.count++

  if (entry.count > maxRequests) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.' },
      { status: 429 }
    )
  }

  return null
}

/**
 * Check honeypot field. Returns a NextResponse with 200 (silent reject) if bot detected, null otherwise.
 */
export function checkHoneypot(body: Record<string, unknown>): NextResponse | null {
  if (body.website || body.company) {
    // Silent success response to not alert the bot
    return NextResponse.json({ success: true })
  }
  return null
}
