import { NextResponse } from 'next/server';
import axios from 'axios';

const PRPC_ENDPOINT = 'http://173.212.220.65:6000/rpc';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await axios.post(PRPC_ENDPOINT, body, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('[API Proxy Error]', error.message);
        return NextResponse.json(
            { error: { message: error.message || 'Internal Server Error' } },
            { status: error.response?.status || 500 }
        );
    }
}
