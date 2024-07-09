import cookie from 'cookie'
import { NextResponse } from 'next/server'

export default function middleware(request) {
	const response = NextResponse.next()

	// Проверка, существует ли кука 'user_level'
	const userLevelCookie = request.cookies.get('user_level')

	if (!userLevelCookie) {
		// Создание строки Set-Cookie
		const serializedCookie = cookie.serialize('user_level', '-1', {
			path: '/',
			httpOnly: true, // Устанавливаем флаг HttpOnly для безопасности
			sameSite: 'strict', // Устанавливаем флаг SameSite для безопасности
		})

		// Установка куки в заголовок ответа
		response.headers.set('Set-Cookie', serializedCookie)
	}
	console.log('middleware:', userLevelCookie)

	return response
}

export const config = {
	matcher: '/:path*',
}
