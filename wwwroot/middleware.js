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
			httpOnly: true, // флаг HttpOnly для безопасности
			sameSite: 'strict', // флаг SameSite для безопасности
		})

		// Setting a cookie in the reply header
		response.headers.set('Set-Cookie', serializedCookie)
	}

	return response
}

export const config = {
	matcher: '/:path*',
}
