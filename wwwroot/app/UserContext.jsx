'use client'
import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function useUser() {
	return useContext(UserContext)
}

export function UserProvider({ initialUserLevel, children }) {
	const [userLevel, setUserLevel] = useState(initialUserLevel || -1)

	// 	useEffect(() => {
	// 		const cookieValue = getUserLevelFromCookie()
	// 		console.log(initialUserLevel)
	// 		setUserLevel(cookieValue || '-1')
	// 	}, [initialUserLevel])
	//
	// 	const getUserLevelFromCookie = () => {
	// 		const cookieObj = document.cookie.split('; ').reduce((prev, current) => {
	// 			const [name, ...value] = current.split('=')
	// 			prev[name] = decodeURIComponent(value.join('='))
	// 			return prev
	// 		}, {})
	// 		console.log(cookieObj)
	// 		return cookieObj['user_level']
	// 	}
	const setUserLevelCookie = level => {
		document.cookie = `user_level=${level}; path=/; max-age=${
			60 * 60 * 24 * 7
		}; SameSite=Strict`
		setUserLevel(level)
	}

	return (
		<UserContext.Provider
			value={{ userLevel, setUserLevel: setUserLevelCookie }}>
			{children}
		</UserContext.Provider>
	)
}
