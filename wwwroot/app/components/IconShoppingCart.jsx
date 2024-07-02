'use client'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import PropTypes from 'prop-types'
import styles from './IconShoppingCart.module.css'

IconShoppingCart.propTypes = {
	itemId: PropTypes.number.isRequired,
	handle: PropTypes.string.isRequired,
	updateCart: PropTypes.func,
}

export default function IconShoppingCart({ itemId, handle, updateCart }) {
	const handleRemoveProduct = async id => {
		try {
			const response = await axios.post(
				'http://localhost:5176/Shop/RemoveProduct',
				{ Id: id }
			)
			console.log(response)
			if (response.data.statusCode === 200) {
				alert('Item removed')
				if (updateCart) {
					updateCart(prevData => prevData.filter(item => item.id !== id))
				}
			} else {
				alert('No item removed')
				console.log(AxiosError)
			}
		} catch (error) {
			console.error(error, AxiosError)
		}
	}

	const handleAddProduct = async id => {
		try {
			const response = await axios.post(
				'http://localhost:5176/Shop/AddProduct',
				{ Id: id }
			)
			if (response.data.statusCode === 200) {
				alert('Item added')
			} else {
				alert('No item added')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleClick = () => {
		if (handle === 'addItem') {
			handleAddProduct(itemId)
		} else if (handle === 'removeItem') {
			handleRemoveProduct(itemId)
		}
	}

	return (
		<button type='submit' className={styles.cartShopIcon} onClick={handleClick}>
			<Image
				src='../../images/icons/shopCart.svg'
				width={27}
				height={27}
				alt='Shopping cart icon'
			/>

			{/* {handle === 'addItem' ? 'Add item' : 'Remove item'} */}
		</button>
	)
}
