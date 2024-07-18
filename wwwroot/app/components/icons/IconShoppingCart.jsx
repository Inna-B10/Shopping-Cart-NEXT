'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styles from './IconShoppingCart.module.css'

IconShoppingCart.propTypes = {
	itemId: PropTypes.number.isRequired,
	updateCart: PropTypes.func,
}

export default function IconShoppingCart({ itemId, updateCart }) {
	const { userId, cartItems, setCartItems } = useUser()
	const [isInCart, setIsInCart] = useState(false)

	useEffect(() => {
		const checkCartStatus = async () => {
			if (userId !== '-1') {
				try {
					const response = await axios.post(
						`http://localhost:5176/Users/GetUserProducts?table=shoppingCart&userId=${userId}`
					)
					const cartItems = response.data.listProducts
					setIsInCart(cartItems.some(item => item.p_id === itemId))
				} catch (error) {
					console.error(error, AxiosError)
				}
			} else {
				setIsInCart(cartItems.some(item => item.prodId === itemId))
			}
		}
		checkCartStatus()
	}, [itemId, userId, cartItems])

	const handleRemoveProduct = async prodId => {
		if (userId !== '-1') {
			try {
				const response = await axios.post(
					`http://localhost:5176/Users/RemoveProduct?table=shoppingCart&userId=${userId}&prodId=${prodId}`
				)
				if (response.data.statusCode === 200) {
					setIsInCart(false)
					if (updateCart) {
						updateCart(prevData =>
							prevData.filter(item => item.p_id !== prodId)
						)
					}
					//remove cookie for logged in user
					// const updatedCart = cartItems.filter(item => item.prodId !== prodId)
					// setCartItems(updatedCart)
					alert('Item removed')
				} else {
					alert('No item removed')
					console.log(AxiosError)
				}
			} catch (error) {
				console.error(error, AxiosError)
			}
		} else {
			const updatedCart = cartItems.filter(item => item.prodId !== prodId)
			setCartItems(updatedCart)
			setIsInCart(false)
			alert('Item removed from cart')
		}
	}

	const handleAddProduct = async prodId => {
		if (userId !== '-1') {
			try {
				const response = await axios.post(
					`http://localhost:5176/Users/AddProduct?table=shoppingCart&userId=${userId}&prodId=${prodId}`
				)
				if (response.data.statusCode === 200) {
					setIsInCart(true)
					//add cookie for logged in user
					// const updatedCart = [...cartItems, { prodId: prodId }]
					// setCartItems(updatedCart)
					alert('Item added')
				} else {
					alert('No item added')
					console.log(AxiosError)
				}
			} catch (error) {
				console.error(error, AxiosError)
			}
		} else {
			const updatedCart = [...cartItems, { prodId: prodId }]
			setCartItems(updatedCart)
			setIsInCart(true)
			alert('Item added to cart')
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
				title={isInCart ? 'Remove from shopping cart' : 'Add to shopping cart'}
			/>
		</button>
	)
}
