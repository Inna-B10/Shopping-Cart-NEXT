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

export default function FavoritesPage() {
	const { userId, favItems } = useUser()
	const [initialData, setInitialData] = useState()

	useEffect(() => {
		const getData = async () => {
			try {
				const request =
					userId !== '-1'
						? 'userId=' + userId
						: 'productIds=' + favItems.map(item => item.prodId)
				const response = await axios.post(
					'http://localhost:5176/Users/GetUserProducts?table=favorites&' +
						request
				)
				setInitialData(response.data.listProducts)
			} catch (error) {
				console.error(error, AxiosError)
			}
		}
		getData()
	}, [userId, favItems])

	if (!initialData) {
		return (
			<div className={`${styles.galleryWrapper} flex column`}>
				<h2 className={`${styles.title} ${messiri.variable}`}>Favorites</h2>
				<div className={styles.spinner}>
					<LoadingSpinner />
				</div>
				<p>
					No connection to database. Please refresh the page or try again later.
				</p>
			</div>
		)
	}

	const handleUpdateFavList = newData => {
		setInitialData(newData)
	}
	return (
		<>
			<h2 className={`${styles.title} ${messiri.variable}`}>Favorites</h2>
			<div className={`${styles.galleryWrapper} flex`}>
				{initialData.length > 0 ? (
					initialData.map((item, index) => (
						<ProductCart
							key={index}
							index={index}
							item={item}
							updateFavList={handleUpdateFavList}
						/>
					))
				) : (
					<p>Your list of favorites is empty</p>
				)}
			</div>
		</>
	)
}
