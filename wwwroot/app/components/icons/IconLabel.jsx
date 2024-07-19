import { Red_Hat_Text } from 'next/font/google'
import PropTypes from 'prop-types'
import styles from './IconLabel.module.css'

const redHat = Red_Hat_Text({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-redHat',
	display: 'swap',
})

IconLabel.propTypes = {
	label: PropTypes.string.isRequired,
	isHovered: PropTypes.bool.isRequired,
}
export default function IconLabel({ label, isHovered }) {
	return (
		label && (
			<div
				className={`${styles.cartLabelIcon} ${isHovered ? styles.hidden : ''}`}>
				<div className={`${styles.labelText} ${redHat.variable}`}>{label}</div>
			</div>
		)
	)
}
