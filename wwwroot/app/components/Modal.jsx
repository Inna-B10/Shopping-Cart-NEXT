'use client'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './Modal.module.css'

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
}

export default function Modal({ show, onClose, children }) {
	useEffect(() => {
		const closeOnEscapeKey = e => (e.key === 'Escape' ? onClose() : null)
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [onClose])

	if (!show) return null

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<button className={styles.closeButton} onClick={onClose}>
					X
				</button>
				{children}
			</div>
		</div>
	)
}
