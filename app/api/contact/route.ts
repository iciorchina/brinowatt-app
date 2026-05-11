import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { sendContactEmail } from '@/lib/services/emailService'

interface ContactPayload {
  name: string
  company?: string
  email: string
  phone?: string
  reason: string
  message: string
  submittedAt?: string
  pageUrl?: string
}

interface StoredContact extends ContactPayload {
  id: string
  receivedAt: string
}

// Dev-only in-memory store. Real persistence happens via the email forwarder
// (Resend) when RESEND_API_KEY is configured in the environment.
const messages: StoredContact[] = []

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const payload = (await req.json()) as ContactPayload

    if (!payload?.email || !payload?.name || !payload?.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (name, email, message)' },
        { status: 400 }
      )
    }

    // Basic email shape check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const id = uuidv4()
    const stored: StoredContact = {
      id,
      receivedAt: new Date().toISOString(),
      ...payload,
    }
    messages.push(stored)

    console.log(
      `[Contact] New message ${id} from ${payload.email} — reason: ${payload.reason}`
    )

    // Email forwarding (no-op if RESEND_API_KEY not set)
    void sendContactEmail(stored).catch((err) =>
      console.error('[Contact] Email forwarding failed:', err)
    )

    return NextResponse.json({
      success: true,
      id,
      message: 'Message received. We will be in touch shortly.',
    })
  } catch (err) {
    console.error('[Contact API] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
