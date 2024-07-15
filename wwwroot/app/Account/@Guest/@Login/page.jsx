'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Modal from '../../../components/Modal'
import styles from './page.module.css'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)
	const router = useRouter()
	const { userId, setUserId, userData } = useUser()
	const [modalText, setModalText] = useState(null)
	const [modalShow, setModalShow] = useState(false)
	const [newUserId, setNewUserId] = useState(null)

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const response = await axios.post(
				`http://localhost:5176/Users/Login?userEmail=${email}&userPassword=${password}`
			)
			console.log(response)
			if (response.data.statusCode === 200) {
				setNewUserId(response.data.userId)
				setModalShow(true)
				setModalText(
					<>
						<h3>Login successful!</h3>
					</>
				)
				setEmail('')
				setPassword('')
				setIsSuccess(true)
			} else if (response.status === 204) {
				setEmail('')
				setPassword('')
				setModalShow(true)
				setModalText(
					<h3>
						The login information provided is incorrect.
						<br />
						Please try again.
					</h3>
				)
				console.error('Error 204:', AxiosError)
			} else {
				setEmail('')
				setPassword('')
				setModalShow(true)
				setModalText(
					<h3>
						Login error.
						<br />
						Please try again.
					</h3>
				)
				console.error(error, AxiosError)
			}
		} catch (error) {
			setModalShow(true)
			setModalText(
				<h3>
					Login/connection error.
					<br />
					Please try again later.
				</h3>
			)
			console.error(error, AxiosError)
		}
	}
	const handleCloseModal = () => {
		setModalShow(false)
		if (isSuccess) {
			// TODO
			//*[ ] check cookies: if exist Favorites and/or ShoppingCart insert them into DB and delete from cookies
			//*[ ]  change email input type
			setIsSuccess(false)
			console.log(newUserId)
			setUserId(newUserId)
			router.replace('/')
		}
	}

	return (
		<>
			<Modal show={modalShow} onClose={handleCloseModal}>
				<div className={styles.modalText}>{modalText}</div>
			</Modal>
			<form className={`flex column ${styles.formWrap}`} onSubmit={handleLogin}>
				<h3>Sign in to your account</h3>
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
				<button type='submit' className={styles.submitBtn}>
					Submit
				</button>
				<span>Reset password</span>
			</form>
		</>
	)
}
