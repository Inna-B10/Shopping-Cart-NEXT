'use client'
import Modal from '@/app/components/Modal'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './page.module.css'

export default function Registration() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const { userLevel, setUserLevel } = useUser()
	const router = useRouter()
	const [isSuccess, setIsSuccess] = useState(false)

	const handleRegister = event => {
		event.preventDefault()
		//onSubmit({ email, password })
		setEmail('')
		setPassword('')
		setFirstName('')
		setLastName('')
		setIsSuccess(true)
	}

	if (isSuccess) {
		setTimeout(() => {
			setUserLevel('0')
			router.replace('/')
		}, 2000)
	}

	return (
		<>
			<Modal
				show={isSuccess}
				onClose={() => {
					setIsSuccess(false), router.replace('/')
				}}>
				<div className={styles.modalText}>
					<h3>Registration successful! </h3>
					<br />
					<br />
					Redirecting...
				</div>
			</Modal>
			<form
				className={`flex column ${styles.formWrap}`}
				onSubmit={handleRegister}>
				<h3>Create new account</h3>
				<span>
					Email:<sup>*</sup>
				</span>
				<input
					required
					// type='email'
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
