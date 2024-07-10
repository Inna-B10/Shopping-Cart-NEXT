'use client'
import { useUser } from '@/app/UserContext'
import { useState } from 'react'
import styles from './page.module.css'

export default function Registration() {
	const { userLevel, setUserLevel } = useUser()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const handleLogin = async event => {
		event.preventDefault()
		//onSubmit({ email, password })
		setEmail('')
		setPassword('')
		setFirstName('')
		setLastName('')
		await setUserLevel('0')
		console.log('Login details:', email, password, userLevel)
	}

	return (
		<>
			<form className={`flex column ${styles.formWrap}`} onSubmit={handleLogin}>
				<h3>Create new account</h3>
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
				<span>
					First name:<sup>*</sup>
				</span>
				<input
					required
					type='text'
					label='First name'
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
				/>
				<span>
					Last name:<sup>*</sup>
				</span>
				<input
					required
					type='text'
					label='Last name'
					value={lastName}
					onChange={e => setLastName(e.target.value)}
				/>
				<button type='submit' className={styles.submitBtn}>
					Submit
				</button>
			</form>
		</>
	)
}
