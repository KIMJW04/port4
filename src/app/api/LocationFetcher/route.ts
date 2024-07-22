// src/app/api/LocationFetcher/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (!latitude || !longitude) {
        return new NextResponse(JSON.stringify({ error: 'Latitude and longitude are required' }), { status: 400 });
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=en`);
        const data = await response.json();
        const name = data.address.city || data.address.town || data.address.village || "Unknown";
        return new NextResponse(JSON.stringify({ name }), { status: 200 });
    } catch (error) {
        console.error("Error fetching location name:", error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
