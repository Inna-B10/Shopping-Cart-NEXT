// import { cookies } from 'next/headers'
//
// export default function Auth() {
// 	const cookieStore = cookies()
// 	const userLevel = cookieStore.get('user_level')?.value
//
// 	// 	if (!userLevel || userLevel !== 'desired_level') {
// 	// 		redirect('/unauthorized')
// 	// 	}
// 	//
// 	// 	return (
// 	// 		<div>
// 	// 			<h1>Protected Page</h1>
// 	// 			<p>Your user level is: {userLevel}</p>
// 	// 		</div>
// 	// 	)
// 	// console.log(userLevel)
// 	return userLevel
// }

import cookie from 'cookie'

export default function getCookies(key) {
	// Парсинг всех куков из document.cookie
	const cookies = cookie.parse(document.cookie)

	let userLevel = cookies[key]

	// Если кука 'user_level' не существует, устанавливаем её
	if (!userLevel) {
		console.log('None')
		userLevel = '-1' // Значение по умолчанию
		document.cookie = cookie.serialize('user_level', userLevel, {
			path: '/', // Устанавливаем путь куки
			maxAge: 60 * 60 * 24 * 7, // Кука будет жить 1 неделю (устанавливается срок действия)
			// Вы можете добавить другие параметры, такие как secure, httpOnly и sameSite
		})
	}

	return userLevel
}
