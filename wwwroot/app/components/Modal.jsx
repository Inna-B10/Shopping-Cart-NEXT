// import { Box, Modal as MuiModal } from '@mui/material'
// import Link from 'next/link'
//
// export default function Modal({ open, handleClose, children }) {
// 	const style = {
// 		position: 'absolute',
// 		top: '50%',
// 		left: '50%',
// 		transform: 'translate(-50%, -50%)',
// 		width: 400,
// 		bgcolor: 'background.paper',
// 		boxShadow: 24,
// 		p: 4,
// 	}
//
// 	return (
// 		<MuiModal
// 			open={open}
// 			onClose={handleClose}
// 			aria-labelledby='modal-modal-title'
// 			aria-describedby='modal-modal-description'>
// 			<Box sx={style}>{children}</Box>
// 			<Link href='/'>Close modal</Link>
// 		</MuiModal>
// 	)
// }

import styles from './Modal.module.css'

export default function Modal({ open, handleClose, children }) {
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
