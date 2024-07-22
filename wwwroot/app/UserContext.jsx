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
	const [bagCount, setBagCount] = useState()
	const [favCount, setFavCount] = useState()

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
					setBagCount(data.user_sc_count)
					setFavCount(data.user_fav_count)
				} catch (error) {
					console.error(error, AxiosError)
				}
			} else {
				// setUserData(null)
				setBagCount(cartItems.length)
				setFavCount(favItems.length)
			}
		}
		fetchUserData()
	}, [userId, cartItems, favItems])

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

	const updateCount = (handle, setter) => {
		setter(prev => (handle === 'add' ? prev + 1 : prev - 1))
	}
	const updateBagCount = handle => updateCount(handle, setBagCount)
	const updateFavCount = handle => updateCount(handle, setFavCount)

	return (
		<UserContext.Provider
			value={{
				userId,
				userData,
				cartItems,
				favItems,
				bagCount,
				favCount,
				setUserId: setUserIdCookie,
				setCartItems: setCartItemsCookie,
				setFavItems: setFavoritesCookie,
				setBagCount: updateBagCount,
				setFavCount: updateFavCount,
			}}>
			{children}
		</UserContext.Provider>
	)
}
