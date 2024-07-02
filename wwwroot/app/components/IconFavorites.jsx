import Image from 'next/image'
import styles from './IconFavorites.module.css'

export default function IconFavorites() {
	return (
		<div className={styles.cartFavoritesIcon}>
			<Image
				src='../../images/icons/favDefaultCart.svg'
				width={27}
				height={27}
				alt='Favorites icon'
			/>
		</div>
	)
}
