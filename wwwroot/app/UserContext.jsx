'use client'
import axios, { AxiosError } from 'axios'
import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import getUserData from './lib/getUserData'

UserProvider.propTypes = {
	initialUserId: PropTypes.string,
	initialCartItems: PropTypes.string,
	initialFavorites: PropTypes.string,
	children: PropTypes.node.isRequired,
}

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
		setUserId(
			initialUserId !== 'null' && initialUserId !== 'undefined'
				? initialUserId
				: '-1'
		)
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

	const setItemCookies = async (type, value, setter) => {
		setCookie(type, value, 7)
		try {
			const response = await axios.post(
				'/api/set-cookies',
				{ type, value },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (response.status === 200 && response.data.success) {
				setter(value)
			} else {
				console.error(response.data.error)
			}
		} catch (error) {
			console.error(error, AxiosError)
		}
	}

	const setUserIdCookie = id => setItemCookies('userId', id, setUserId)
	const setCartItemsCookie = items =>
		setItemCookies('cartItems', items, setCartItems)
	const setFavoritesCookie = items =>
		setItemCookies('favItems', items, setFavItems)

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
