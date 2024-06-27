'use client'
// import axios from 'axios'
import axios, { AxiosError } from 'axios'
import PropTypes from 'prop-types'

export default function ButtonCart({ itemId, handle, updateCart }) {
	const handleRemoveProduct = async id => {
		try {
			const response = await axios.post(
				'https://localhost:7283/Shop/RemoveProduct',
				{ Id: id }
			)
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
				'https://localhost:7283/Shop/AddProduct',
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
		<button
			type='submit'
			className='button w3l-cart'
			data-id={`cart-${itemId}`}
			onClick={handleClick}>
			{handle === 'addItem' ? 'Add item' : 'Remove item'}
		</button>
	)
}

ButtonCart.propTypes = {
	itemId: PropTypes.number.isRequired,
	handle: PropTypes.string.isRequired,
	updateCart: PropTypes.func,
}
