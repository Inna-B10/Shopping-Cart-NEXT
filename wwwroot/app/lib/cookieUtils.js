import cookie from 'cookie'

// Get a cookie by name
export const getCookie = name => {
	const cookies = cookie.parse(document.cookie)
	return cookies[name] || null // Return the cookie value or null if not found
}

// Set a cookie
export const setCookie = (name, value, days = 7) => {
	const expires = new Date()
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
	const serializedCookie = cookie.serialize(name, value, {
		expires: expires,
		path: '/',
		// httpOnly: true,
		sameSite: 'Strict',
	})
	document.cookie = serializedCookie
}

// Delete a cookie
export const deleteCookie = name => {
	const serializedCookie = cookie.serialize(name, '', {
		expires: new Date(0),
		// httpOnly: true,
		path: '/',
	})
	document.cookie = serializedCookie
}
