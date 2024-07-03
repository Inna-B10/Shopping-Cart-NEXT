'use client'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'
import IconFavorites from './IconFavorites'
import IconLabel from './IconLabel'
import IconShoppingCart from './IconShoppingCart'
import styles from './ProductCart.module.css'

ProductCart.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.shape({
		p_id: PropTypes.number.isRequired,
		p_name: PropTypes.string.isRequired,
		p_cat_id: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		price_discounted: PropTypes.number,
		p_desc_short: PropTypes.string,
		p_desc_full: PropTypes.string,
		p_article_num: PropTypes.string,
		p_tags: PropTypes.string.isRequired,
		p_is_stone: PropTypes.bool.isRequired,
		p_label: PropTypes.string,
		p_cat_name: PropTypes.string,
	}).isRequired,
	handle: PropTypes.string.isRequired,
	updateCart: PropTypes.func,
}

export default function ProductCart({ index, item, handle, updateCart }) {
	// console.log(item)
	const [mainImage, setMainImage] = useState('')
	const [hoverImage, setHoverImage] = useState('')
	const [currentImage, setCurrentImage] = useState('')
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		const mainImgPath = `/media/${item.p_cat_id}/${item.p_name}/main.webp`
		const hoverImgPath = `/media/${item.p_cat_id}/${item.p_name}/hover.webp`

		setMainImage(mainImgPath)
		setCurrentImage(mainImgPath)

		fetch(hoverImgPath).then(res => {
			if (res.ok) {
				setHoverImage(hoverImgPath)
			} else {
				setHoverImage(mainImgPath)
			}
		})
	}, [item.p_cat_id, item.p_name])

	const handleMouseEnter = () => {
		{
			// setCurrentImage(hoverImage)
			setIsHovered(true)
		}
	}

	const handleMouseLeave = () => {
		// setCurrentImage(mainImage)
		setIsHovered(false)
	}
	return (
		<Fragment>
			<div
				className={`flex column ${styles.productCart}`}
				style={{ backgroundImage: `url(${hoverImage})` }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
				<div
					className={`flex column ${styles.cartTop} ${
						isHovered ? styles.hidden : styles.visible
					}`}>
					<Image
						className={styles.cartImage}
						src={currentImage}
						alt='img'
						width={280}
						height={260}
					/>
					<div className={styles.cartName}>{item.p_name}</div>
				</div>
				<div
					className={`flex column ${styles.cartBottom} ${
						isHovered ? styles.hidden : styles.visible
					}`}>
					<div className={styles.cartDesc}>{item.p_desc_short}</div>
					<div className={styles.cartPrice}>
						{item.p_price_discounted ? (
							<>
								<span className={styles.cartPriceThrough}>
									${item.p_price},-
								</span>
								<span className={styles.cartPriceRed}>
									${item.p_price_discounted},-
								</span>
							</>
						) : (
							`${item.p_price},-`
						)}
					</div>
				</div>

				<div>
					<IconShoppingCart
						key={index}
						itemId={item.p_id}
						handle={handle}
						updateCart={updateCart}
					/>
				</div>
				<div>
					<IconFavorites />
				</div>
				<div>
					<IconLabel label={item.p_label} isHovered={isHovered} />
				</div>
			</div>
		</Fragment>
	)
}
