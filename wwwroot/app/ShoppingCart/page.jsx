'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import ProductCart from '../components/ProductCart'

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

	return (
		<>
			<div>
				<h1>Shopping cart</h1>
			</div>

			<div>
				{initialData?.length > 0 ? (
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
					<p>
						{initialData
							? 'Shopping cart is empty'
							: 'Could not connect to get data. Please, try again later.'}
					</p>
				)}
			</div>
		</>
	)
}
