import { NextResponse } from 'next/server'

export function middleware(request) {
	const response = NextResponse.next()

	// Check if the cookie 'user_level' already exists
	if (!request.cookies.get('user_level')) {
		console.log('Setting user_level cookie')
		// If it doesn't exist, set the cookie with value '-1'
		response.cookies.set('user_level', '-1', { path: '/' })
	} else {
		console.log('user_level cookie already exists')
	}

	return response
}

// Specify the paths to include middleware (all paths in this case)
export const config = {
	matcher: '/:path*',
}
