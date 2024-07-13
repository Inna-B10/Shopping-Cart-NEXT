import PropTypes from 'prop-types'
import { Fragment } from 'react'
import ButtonCart from './icons/IconShoppingCart'

ImageCart.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		discountedPrice: PropTypes.number.isRequired,
		actualPrice: PropTypes.number.isRequired,
	}).isRequired,
	handle: PropTypes.string.isRequired,
	updateCart: PropTypes.func,
}

export default function ImageCart({ index, item, handle, updateCart }) {
	return (
		<Fragment>
			<div className='cart-grid' id={`cart-${index}`}>
				<div className='img'>
					{/* <img src={`./assets/images/${item.image}`} alt='img' /> */}
					<img src={`../media/${item.image}`} alt='img' />
				</div>
				<div className='prod-name'>{item.name}</div>
				<ul className='info'>
					<li>${item.discountedPrice}</li>
					<li className='right-text'>${item.actualPrice}</li>
				</ul>
				<div className='snipcart-details'>
					<ButtonCart
						key={index}
						itemId={item.id}
						handle={handle}
						updateCart={updateCart}
					/>
				</div>
			</div>
		</Fragment>
	)
}
