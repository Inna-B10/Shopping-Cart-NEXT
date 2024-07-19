import cookie from 'cookie'
import { NextResponse } from 'next/server'

async function fetchCategories() {
	try {
		const res = await fetch('http://localhost:5176/Shop/Categories')
		if (!res.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await res.json()
		return data.listCategories.map(category => category.cat_name)
	} catch (error) {
		console.error('Error fetching categories:', error)
		return []
	}
}

export default async function middleware(request) {
	const response = NextResponse.next()

	// Fetch categories
	const validCategories = await fetchCategories()

	// Parse URL and check for category existence
	const url = new URL(request.url)
	const pathSegments = url.pathname.split('/')

	if (pathSegments[1] === 'Products' && pathSegments[2]) {
		const category = decodeURIComponent(pathSegments[2])

		// If category does not exist, redirect to home
		if (!validCategories.includes(category)) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	// Set a cookie if it doesn't exist or is invalid
	const setCookieIfInvalid = (name, defaultValue) => {
		const cookieValue = request.cookies.get(name)?.value
		if (!cookieValue || cookieValue === 'null' || cookieValue === 'undefined') {
			const serializedCookie = cookie.serialize(name, defaultValue, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 1 week
				httpOnly: true,
				sameSite: 'strict',
			})
			response.headers.set('Set-Cookie', serializedCookie)
		}
	}

	// Setting cookies if they are invalid
	setCookieIfInvalid('userId', '-1')
	setCookieIfInvalid('cartItems', '[]')
	setCookieIfInvalid('favItems', '[]')

	return response
}

export const config = {
	matcher: '/:path*',
}
