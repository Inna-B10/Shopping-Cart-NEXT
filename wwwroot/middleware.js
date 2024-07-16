import cookie from 'cookie'
import { NextResponse } from 'next/server'

export default function middleware(request) {
	const response = NextResponse.next()

	// Checking if the 'userId' cookie exists
	const userIdCookie = request.cookies.get('userId')?.value

	if (
		!userIdCookie ||
		userIdCookie === 'null' ||
		userIdCookie === 'undefined'
	) {
		// Creating a Set-Cookie line
		const serializedCookie = cookie.serialize('userId', '-1', {
			path: '/',
			maxAge: 60 * 60 * 24 * 7, //1 week
			httpOnly: true,
			sameSite: 'strict',
		})

		// Setting a cookie in the reply header
		response.headers.set('Set-Cookie', serializedCookie)
	}

	// Checking if the 'cartItems' cookie exists
	const cartItemsCookie = request.cookies.get('cartItems')?.value

	if (
		!cartItemsCookie ||
		cartItemsCookie === 'null' ||
		cartItemsCookie === 'undefined'
	) {
		const serializedCookie = cookie.serialize('cartItems', '[]', {
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			httpOnly: true,
			sameSite: 'strict',
		})
		response.headers.set('Set-Cookie', serializedCookie)
	}

	return response
}

export const config = {
	matcher: '/:path*',
}
