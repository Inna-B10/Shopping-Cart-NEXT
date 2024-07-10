// import styles from '../components/Modal.module.css'
//
// export default function Test({ open, handleClose, children }) {
// 	// if (!open) return null
//
// 	return (
// 		<div className={styles.overlay}>
// 			<div className={styles.modal}>
// 				<button className={styles.closeButton} onClick={handleClose}>
// 					X
// 				</button>
// 				{children}
// 			</div>
// 		</div>
// 	)
// }

'use client'
import { useState } from 'react'
import { useUser } from './../UserContext'
import styles from './page.module.css'

export default function LoginPage() {
	const { userLevel, setUserLevel } = useUser()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()
		//onSubmit({ email, password })
		setEmail('')
		setPassword('')
		await setUserLevel('0')
		console.log('Login details:', email, password, userLevel)
	}

	return (
		<>
			<form className={`flex column ${styles.formWrap}`} onSubmit={handleLogin}>
				<h3>Sign in to your account</h3>
				<span>
					Email:<sup>*</sup>
				</span>
				<input
					type='text'
					label='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<span>
					Password:<sup>*</sup>
				</span>
				<input
					type='password'
					label='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit' className={styles.submitBtn}>
					Submit
				</button>
				<span>Reset password</span>
			</form>
		</>
	)
}
