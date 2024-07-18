import cookie from 'cookie'
import { NextResponse } from 'next/server'

export async function POST(request) {
	const { favItems } = await request.json()

	const serializedCookie = cookie.serialize(
		'favItems',
		JSON.stringify(favItems),
		{
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			// maxAge: 60 * 60 * 24 * 7,
		}
	)

	const response = NextResponse.json({ success: true })
	response.headers.set('Set-Cookie', serializedCookie)

	return response
}
