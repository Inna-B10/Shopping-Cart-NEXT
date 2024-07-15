'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getCookie, setCookie } from '../../lib/cookieUtils'
import styles from './IconShoppingCart.module.css'

IconShoppingCart.propTypes = {
	itemId: PropTypes.number.isRequired,
	handle: PropTypes.string.isRequired,
	updateCart: PropTypes.func,
}

export default function IconShoppingCart({ itemId, handle, updateCart }) {
	const { userId } = useUser()
	const [isInCart, setIsInCart] = useState(false)

	useEffect(() => {
		const checkCartStatus = async () => {
			if (userId !== '-1') {
				try {
					const response = await axios.post(
						`http://localhost:5176/Users/GetShopCart?userId=${userId}`
					)
					const cartItems = response.data.listProducts
					setIsInCart(cartItems.some(item => item.p_id === itemId)) //?item.?id
				} catch (error) {
					console.error(error, AxiosError)
				}
			} else {
				const cartItems = JSON.parse(getCookie('shopCart') || '[]')
				console.log(cartItems)
				setIsInCart(cartItems.some(item => item.prodId === itemId)) //?id
			}
		}

		checkCartStatus()
	}, [itemId, userId])

	const handleRemoveProduct = async prodId => {
		if (userId !== '-1') {
			try {
				const response = await axios.post(
					`http://localhost:5176/Users/RemoveProduct?userId=${userId}&prodId=${prodId}`
					//  http://localhost:5176/Users/RemoveProduct?userId=1&prodId=2
					// 'http://localhost:5176/Users/RemoveProduct',
					// { userId: userId, prodId: prodId }
				)
				console.log(response)
				if (response.data.statusCode === 200) {
					alert('Item removed')
					setIsInCart(false)
					if (updateCart) {
						updateCart(
							prevData => prevData.filter(item => item.p_id !== prodId) //?id
						)
					}
				} else {
					alert('No item removed')
					console.log(AxiosError)
				}
			} catch (error) {
				console.error(error, AxiosError)
			}
		} else {
			const cartItems = JSON.parse(getCookie('shopCart') || '[]')
			const updatedCart = cartItems.filter(item => item.prodId !== prodId) //?id
			setCookie('shopCart', JSON.stringify(updatedCart))
			alert('Item removed from cart')
			setIsInCart(false)
		}
	}

	const handleAddProduct = async prodId => {
		if (userId !== '-1') {
			try {
				const response = await axios.post(
					`http://localhost:5176/Users/AddProduct?userId=${userId}&prodId=${prodId}`
					//http://localhost:5176/Users/AddProduct?userId=1&prodId=2
					// 'http://localhost:5176/Users/AddProduct',
					// { userId: userId, prodId: prodId }
				)
				if (response.data.statusCode === 200) {
					alert('Item added')
					setIsInCart(true)
				} else {
					alert('No item added')
				}
			} catch (error) {
				console.error(error)
			}
		} else {
			const cartItems = JSON.parse(getCookie('shopCart') || '[]')
			cartItems.push({ prodId })
			setCookie('shopCart', JSON.stringify(cartItems))
			alert('Item added to cart')
			setIsInCart(true)
		}
	}
	const handleClick = () => {
		if (isInCart) {
			handleRemoveProduct(itemId)
		} else {
			handleAddProduct(itemId)
		}
	}

	return (
		<button type='submit' className={styles.cartShopIcon} onClick={handleClick}>
			<Image
				src={
					isInCart
						? '../../images/icons/shopCartAdded.svg'
						: '../../images/icons/shopCart.svg'
				}
				width={27}
				height={27}
				alt='Shopping cart icon'
			/>

			{/* {handle === 'addItem' ? 'Add item' : 'Remove item'} */}
		</button>
	)
}
