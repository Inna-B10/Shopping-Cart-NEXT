import { Red_Hat_Text } from 'next/font/google'
import styles from './IconLabel.module.css'

const redHat = Red_Hat_Text({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-redHat',
	display: 'swap',
})
export default function IconLabel({ label }) {
	return (
		<div className={styles.cartLabelIcon}>
			<div className={`${styles.labelText} ${redHat.variable}`}>{label}</div>
		</div>
	)
}
