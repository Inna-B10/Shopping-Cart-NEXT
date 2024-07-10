'use client'
import { useUser } from '@/app/UserContext'
import { useState } from 'react'
import styles from './page.module.css'

export default function LoginPage({ onSubmit }) {
	const { userLevel, setUserLevel } = useUser()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = event => {
		event.preventDefault()
		setEmail('')
		setPassword('')
		// setUserLevel('1')
		console.log(email, password, userLevel)
	}

	return (
		<>
			<form className={`flex column ${styles.formWrap}`} onSubmit={handleLogin}>
				<h3>Sign in to your account</h3>
				<span>
					Email:<sup>*</sup>
				</span>
				<input
					required
					type='text'
					label='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<span>
					Password:<sup>*</sup>
				</span>
				<input
					required
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
