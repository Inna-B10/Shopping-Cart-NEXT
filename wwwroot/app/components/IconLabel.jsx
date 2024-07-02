import styles from './IconLabel.module.css'

export default function IconLabel({ label }) {
	console.log(label)
	return (
		<div className={styles.cartLabelIcon}>
			<div className={styles.labelText}>{label}</div>
		</div>
	)
}
