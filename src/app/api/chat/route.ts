// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { userId, content } = await request.json();

    if (!userId || !content) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Emit the message to all connected clients
    // You need a server-side Socket.IO instance to handle this

    return NextResponse.json({ userId, content }, { status: 201 });
}
