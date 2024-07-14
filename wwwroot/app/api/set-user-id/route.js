import cookie from 'cookie'
import { NextResponse } from 'next/server'

export async function POST(request) {
	const { userId } = await request.json()

	const serializedCookie = cookie.serialize('userId', userId, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
	})

	const response = NextResponse.json({ success: true })
	response.headers.set('Set-Cookie', serializedCookie)

	return response
}
