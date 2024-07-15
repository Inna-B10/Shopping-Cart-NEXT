'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import ProductCart from '../components/ProductCart'
import { getCookie } from '../lib/cookieUtils'

export default function ShoppingCart() {
	const { userId } = useUser()
	const [initialData, setInitialData] = useState()
	const [cookieItems, setCookieItems] = useState()

	useEffect(() => {
		const getData = async () => {
			if (userId !== '-1') {
				try {
					const response = await axios.post(
						`http://localhost:5176/Users/GetShopCart?userId=${userId}`
					)
					console.log(response)
					setInitialData(response.data.listProducts)
				} catch (error) {
					console.error(error, AxiosError)
				}
			} else {
				setInitialData(JSON.parse(getCookie('shopCart') || '[]'))
				// setCookieItems(JSON.parse(getCookie('shopCart') || '[]'))
			}
		}

		getData()
	}, [userId])

	console.log(cookieItems)

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
