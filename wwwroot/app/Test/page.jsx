import styles from '../components/Modal.module.css'

export default function Test({ open, handleClose, children }) {
	// if (!open) return null

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<button className={styles.closeButton} onClick={handleClose}>
					X
				</button>
				{children}
			</div>
		</div>
	)
}
