import { El_Messiri } from 'next/font/google'
import Image from 'next/image'
import PropTypes from 'prop-types'
import styles from './SubCatCart.module.css'

const messiri = El_Messiri({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-messiri',
	display: 'swap',
})

SubCatCart.propTypes = {
	src: PropTypes.string.isRequired,
	cat_name: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
}

export default function SubCatCart({ src, cat_name, color }) {
	const subCatClass = color === 'gold' ? styles.subCatGold : styles.subCatSilver
	const imgClass = color === 'gold' ? styles.imgGold : styles.imgSilver
	const ribbonClass = color === 'gold' ? styles.ribbonGold : styles.ribbonSilver
	return (
		<div className={subCatClass}>
			<figure className={imgClass}>
				<Image
					src={src}
					width={300}
					height={300}
					alt={'Category - ' + cat_name}
					quality={100}
				/>
			</figure>
			<h3
				className={`${ribbonClass} ${styles.subcatTitle} ${messiri.variable}`}>
				{cat_name}
			</h3>
		</div>
	)
}
