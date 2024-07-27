'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styles from './IconFavorites.module.css'

IconFavorites.propTypes = {
	itemId: PropTypes.number.isRequired,
	updateFavList: PropTypes.func,
}

export default function IconFavorites({ itemId, updateFavList }) {
	const { userId, favItems, setFavItems, setFavCount } = useUser()
	const [isInFav, setIsInFav] = useState(false)

	useEffect(() => {
		const checkFavStatus = async () => {
			if (userId !== '-1') {
				try {
					const response = await axios.post(
						`http://localhost:5176/Users/GetUserProducts?table=favorites&userId=${userId}`
					)
					const favItems = response.data.listProducts
					setIsInFav(favItems.some(item => item.p_id === itemId))
				} catch (error) {
					console.error(error, AxiosError)
				}
			} else {
				setIsInFav(favItems.some(item => item.prodId === itemId))
			}
		}
		checkFavStatus()
	}, [itemId, userId, favItems])

	const handleRemoveProduct = async prodId => {
		if (userId !== '-1') {
			try {
				const response = await axios.post(
					`http://localhost:5176/Users/RemoveProduct?table=favorites&userId=${userId}&prodId=${prodId}`
				)
				if (response.data.statusCode === 200) {
					setIsInFav(false)
					setFavCount('remove')
					if (updateFavList) {
						updateFavList(prevData =>
							prevData.filter(item => item.p_id !== prodId)
						)
					}
					//remove cookie for logged in user
					// const updatedFavList = favItems.filter(item => item.prodId !== prodId)
					// setFavItems(updatedFavList)
					alert('Item removed')
				} else {
					alert('No item removed')
					console.log(AxiosError)
				}
			} catch (error) {
				console.error(error, AxiosError)
			}
		} else {
			const updatedFavList = favItems.filter(item => item.prodId !== prodId)
			setFavItems(updatedFavList)
			setIsInFav(false)
			setFavCount('remove')
			alert('Item removed')
		}
	}

	const handleAddProduct = async prodId => {
		if (userId !== '-1') {
			try {
				const response = await axios.post(
					`http://localhost:5176/Users/AddProduct?table=favorites&userId=${userId}&prodId=${prodId}`
				)
				if (response.data.statusCode === 200) {
					setIsInFav(true)
					setFavCount('add')
					// add cookie for logged in user
					// const updatedFavList = [...favItems, { prodId: prodId }]
					// setFavItems(updatedFavList)
					alert('Item added')
				} else {
					alert('No item added')
					console.log(AxiosError)
				}
			} catch (error) {
				console.error(error, AxiosError)
			}
		} else {
			const updatedFavList = [...favItems, { prodId: prodId }]
			setFavItems(updatedFavList)
			setIsInFav(true)
			setFavCount('add')
			alert('Item added')
		}
	}
	const handleClick = () => {
		if (isInFav) {
			handleRemoveProduct(itemId)
		} else {
			handleAddProduct(itemId)
		}
	}
	return (
		<button
			type='submit'
			className={styles.cartFavoritesIcon}
			onClick={handleClick}>
			<Image
				src={
					isInFav
						? '../../images/icons/favAddedCart.svg'
						: '../../images/icons/favDefaultCart.svg'
				}
				width={27}
				height={27}
				alt='Favorites icon'
				title={isInFav ? 'Remove from favItems' : 'Add to favItems'}
			/>
		</button>
	)
}
