'use client'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import Joi from 'joi'
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

	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.messages({
				'string.email': 'Invalid email format.',
				'string.empty': 'Email is required.',
			}),
		password: Joi.string().min(8).required().messages({
			'string.min': 'Password must be at least 8 characters long.',
			'string.empty': 'Password is required.',
		}),
	})

	const validateInputs = () => {
		const { error } = schema.validate({ email, password })
		if (error) {
			setModalText(<h3>{error.details[0].message}</h3>)
			setModalShow(true)
			return false
		}
		return true
	}

	const handleLogin = async event => {
		event.preventDefault()

		if (!validateInputs()) {
			return
		}

		try {
			const response = await axios.post('http://localhost:5176/Users/Login', {
				UserEmail: email,
				UserPassword: password,
			})
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
				//console.error('Error 204:', AxiosError)
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
			setEmail('')
			setPassword('')
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
			setIsSuccess(false)
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
					type='email'
					name='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<span>
					Password:<sup>*</sup>
				</span>
				<input
					required
					type='password'
					name='Password'
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
