'use client'
import axios, { AxiosError } from 'axios'
import PropTypes from 'prop-types'
import styles from './ButtonCart.module.css'

ButtonCart.propTypes = {
	itemId: PropTypes.number.isRequired,
	handle: PropTypes.string.isRequired,
	updateCart: PropTypes.func,
}

export default function ButtonCart({ itemId, handle, updateCart }) {
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
			<svg
				width='27'
				height='27'
				viewBox='0 0 27 27'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M10.6667 24C10.6667 25.4667 9.46667 26.6667 8 26.6667C6.53333 26.6667 5.33333 25.4667 5.33333 24C5.33333 22.5333 6.53333 21.3333 8 21.3333C9.46667 21.3333 10.6667 22.5333 10.6667 24ZM21.3333 21.3333C19.8667 21.3333 18.6667 22.5333 18.6667 24C18.6667 25.4667 19.8667 26.6667 21.3333 26.6667C22.8 26.6667 24 25.4667 24 24C24 22.5333 22.8 21.3333 21.3333 21.3333ZM8.26667 17.0667V16.9333L9.46667 14.6667H19.3333C20.2667 14.6667 21.2 14.1333 21.6 13.3333L26.1665 4.3335L24.6665 2.66667L19.3333 12H10L4.4 0H0V2.66667H2.66667L7.46667 12.8L5.6 16C5.46667 16.4 5.33333 16.8 5.33333 17.3333C5.33333 18.8 6.53333 20 8 20H24V17.3333H8.53333C8.4 17.3333 8.26667 17.2 8.26667 17.0667ZM26.1665 4.3335L24.6665 2.66667H17.1665H12.6665V5.3335H17.1665H23.1426L26.1665 4.3335Z'
					fill='#A20909'
				/>
			</svg>

			{/* {handle === 'addItem' ? 'Add item' : 'Remove item'} */}
		</button>
	)
}
