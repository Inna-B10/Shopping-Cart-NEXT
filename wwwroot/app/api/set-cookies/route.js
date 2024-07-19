import cookie from 'cookie'
import { NextResponse } from 'next/server'

export async function POST(request) {
	const { type, value } = await request.json()

	let serializedCookie

	switch (type) {
		case 'userId':
			serializedCookie = cookie.serialize('userId', value, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 1 week
			})
			break
		case 'cartItems':
		case 'favItems':
			serializedCookie = cookie.serialize(type, JSON.stringify(value), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				// maxAge: 60 * 60 * 24 * 7, // 1 week
			})
			break
		default:
			return NextResponse.json(
				{ success: false, error: 'Invalid type' },
				{ status: 400 }
			)
	}

	const response = NextResponse.json({ success: true })
	response.headers.set('Set-Cookie', serializedCookie)

	return response
}
