'use client'
import axios, { AxiosError } from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import getUserData from './lib/getUserData'

const UserContext = createContext()

export function useUser() {
	return useContext(UserContext)
}

export function UserProvider({ initialUserId, children }) {
	const [userId, setUserId] = useState(initialUserId || '-1')
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		if (initialUserId !== 'null' && initialUserId !== 'undefined') {
			setUserId(initialUserId)
		} else {
			setUserId('-1')
		}
	}, [initialUserId])

	useEffect(() => {
		const fetchUserData = async () => {
			console.log(userId)
			if (userId !== '-1') {
				try {
					const data = await getUserData(userId)
					setUserData(data)
				} catch (error) {
					console.error(error, AxiosError)
				}
			} else {
				setUserData(null)
			}
		}

		fetchUserData()
	}, [userId])

	const setUserIdCookie = async id => {
		document.cookie = `userId=${id}; path=/; max-age=${
			60 * 60 * 24 * 7 //1 week
		}; SameSite=Strict`

		try {
			const response = await axios.post(
				'/api/set-user-id',
				{ userId: id },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.status === 200 && response.data.success) {
				setUserId(id)
			} else {
				console.error(error, AxiosError)
			}
		} catch (error) {
			console.error(error, AxiosError)
		}
	}

	return (
		<UserContext.Provider
			value={{ userId, userData, setUserId: setUserIdCookie }}>
			{children}
		</UserContext.Provider>
	)
}
