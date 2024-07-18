'use client'
import axios, { AxiosError } from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import getUserData from './lib/getUserData'

const UserContext = createContext()

export function useUser() {
	return useContext(UserContext)
}

export function UserProvider({
	initialUserId,
	initialCartItems,
	initialFavorites,
	children,
}) {
	const [userId, setUserId] = useState(initialUserId || '-1')
	const [userData, setUserData] = useState(null)
	const [cartItems, setCartItems] = useState(JSON.parse(initialCartItems) || [])
	const [favItems, setFavItems] = useState(JSON.parse(initialFavorites) || [])

	useEffect(() => {
		if (initialUserId !== 'null' && initialUserId !== 'undefined') {
			setUserId(initialUserId)
		} else {
			setUserId('-1')
		}
	}, [initialUserId])

	useEffect(() => {
		const fetchUserData = async () => {
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

	const setCookie = (name, value, days) => {
		document.cookie = `${name}=${value}; path=/; max-age=${
			days * 24 * 60 * 60
		}; SameSite=Strict`
	}

	const setUserIdCookie = async id => {
		setCookie('userId', id, 7)

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
				// console.error(error, AxiosError)
				console.error(response.data.error)
			}
		} catch (error) {
			console.error(error, AxiosError)
		}
	}

	const setCartItemsCookie = async items => {
		setCookie('cartItems', JSON.stringify(items), 7)
		try {
			const response = await axios.post(
				'/api/set-cart-items',
				{ cartItems: items },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.status === 200 && response.data.success) {
				setCartItems(items)
			} else {
				// console.error(error, AxiosError)
				console.error(response.data.error)
			}
		} catch (error) {
			console.error(error, AxiosError)
		}
	}
	const setFavoritesCookie = async items => {
		setCookie('favItems', JSON.stringify(items), 7)
		try {
			const response = await axios.post(
				'/api/set_fav-cookies',
				{ favItems: items },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.status === 200 && response.data.success) {
				setFavItems(items)
			} else {
				// console.error(error, AxiosError)
				console.error(response.data.error)
			}
		} catch (error) {
			console.error(error, AxiosError)
		}
	}

	return (
		<UserContext.Provider
			value={{
				userId,
				userData,
				cartItems,
				favItems,
				setUserId: setUserIdCookie,
				setCartItems: setCartItemsCookie,
				setFavItems: setFavoritesCookie,
			}}>
			{children}
		</UserContext.Provider>
	)
}
