'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import { El_Messiri } from 'next/font/google'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import ProductCart from '../components/ProductCart'
import styles from './page.module.css'

const messiri = El_Messiri({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-messiri',
	display: 'swap',
})

export default function ShoppingCart() {
	const { userId, cartItems } = useUser()
	const [initialData, setInitialData] = useState()

	useEffect(() => {
		const getData = async () => {
			try {
				const request =
					userId !== '-1'
						? 'userId=' + userId
						: 'productIds=' + cartItems.map(item => item.prodId)
				const response = await axios.post(
					'http://localhost:5176/Users/GetShoppingCart?' + request
				)
				setInitialData(response.data.listProducts)
			} catch (error) {
				console.error(error, AxiosError)
			}
		}
		getData()
	}, [userId, cartItems])

	const handleUpdateCart = newData => {
		setInitialData(newData)
	}

	if (!initialData) {
		return (
			<div className={`${styles.galleryWrapper} flex column`}>
				<h2 className={`${styles.title} ${messiri.variable}`}>Shopping cart</h2>
				<div className={styles.spinner}>
					<LoadingSpinner />
				</div>
				<p>
					No connection to database. Please refresh the page or try again later.
				</p>
			</div>
		)
	}

	return (
		<>
			<h2 className={`${styles.title} ${messiri.variable}`}>Shopping cart</h2>
			<div className={`${styles.galleryWrapper} flex column`}>
				{initialData.length > 0 ? (
					initialData.map((item, index) => (
						<ProductCart
							key={index}
							index={index}
							item={item}
							handle='removeItem'
							updateCart={handleUpdateCart}
						/>
					))
				) : (
					<p>Shopping cart is empty</p>
				)}
			</div>
		</>
	)
}
