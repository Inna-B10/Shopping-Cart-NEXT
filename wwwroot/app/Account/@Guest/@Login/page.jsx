'use client'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Modal from '../../../components/Modal'
import styles from './page.module.css'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)
	const router = useRouter()
	const { userLevel, setUserLevel } = useUser()

	const handleLogin = event => {
		event.preventDefault()
		setEmail('')
		setPassword('')
		setIsSuccess(true)
	}
	if (isSuccess) {
		setTimeout(() => {
			setUserLevel('1')
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
					<h3>Login successful! </h3>
					<br />
					<br />
					Redirecting...
				</div>
			</Modal>
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
