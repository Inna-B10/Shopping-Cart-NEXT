'use client'
import Modal from '@/app/components/Modal'
import { useUser } from '@/app/UserContext'
import axios, { AxiosError } from 'axios'
import Joi from 'joi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './page.module.css'

export default function Registration() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const { userId, setUserId } = useUser()
	const router = useRouter()
	const [isSuccess, setIsSuccess] = useState(false)
	const [modalText, setModalText] = useState(null)
	const [modalShow, setModalShow] = useState(false)
	const [newUserId, setNewUserId] = useState(null)

	const schema = Joi.object({
		firstName: Joi.string()
			.min(2)
			.pattern(/^[A-Za-z-\s]+$/)
			.required()
			.messages({
				'string.min': 'First name must be at least 2 characters long.',
				'string.pattern.base':
					'First name can only contain Latin letters, hyphens and spaces.',
				'string.empty': 'First name is required.',
			}),
		lastName: Joi.string()
			.min(2)
			.pattern(/^[A-Za-z-\s]+$/)
			.required()
			.messages({
				'string.min': 'Last name must be at least 2 characters long.',
				'string.pattern.base':
					'Last name can only contain Latin letters, hyphens and spaces.',
				'string.empty': 'Last name is required.',
			}),
		email: Joi.string()
			.pattern(/^[^\s@]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/)
			.required()
			.messages({
				'string.pattern.base':
					'Email must be a valid email address with a domain consisting only of Latin letters, numbers, or hyphens',
				'string.empty': 'Email is required.',
			}),
		password: Joi.string()
			.min(8)
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|[\W_])).+$/)
			.required()
			.messages({
				'string.min': 'Password must be at least 8 characters long.',
				'string.pattern.base':
					'The password must contain at least one capital Latin letter, one small Latin letter, and either a number or a special symbol.',
				'string.empty': 'Password is required.',
			}),
	})

	const handleRegister = async event => {
		event.preventDefault()
		console.log(email, password)

		const { error } = schema.validate(
			{
				firstName,
				lastName,
				email,
				password,
			},
			{ abortEarly: false }
		)
		if (error) {
			//console.log(error.details[0].message)
			setModalShow(true)
			setModalText(
				<>
					<h3>Validation Error</h3>
					<ul>
						{error.details.map((err, index) => (
							<li key={index}>{err.message}</li>
						))}
					</ul>
				</>
			)
			return
		}

		try {
			const response = await axios.post(
				'http://localhost:5176/Users/Registration',
				{
					UserEmail: email,
					UserPasswordHash: password,
					UserFname: firstName,
					UserLname: lastName,
				}
			)
			if (response.data.statusCode === 201) {
				setNewUserId(response.data.userId)
				setModalShow(true)
				setModalText(
					<>
						<h3>Registration successful!</h3>
						<br />
						<br />
						A confirmation link has been sent to your email.
						<br />
						Please verify your registration.
					</>
				)
				setEmail('')
				setPassword('')
				setFirstName('')
				setLastName('')
				setIsSuccess(true)
			} else {
				setModalShow(true)
				setModalText(
					<h3>
						Registration error.
						<br />
						Please try again.
					</h3>
				)
				console.error('Error:', response.data.statusMessage)
			}
		} catch (error) {
			if (error.response && error.response.data.statusCode === 409) {
				setModalShow(true)
				setModalText(<h3>User with this email already exists.</h3>)
			} else {
				setModalShow(true)
				setModalText(
					<h3>
						Registration error.
						<br />
						Please try again.
					</h3>
				)
			}
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
			<form
				className={`flex column ${styles.formWrap}`}
				onSubmit={handleRegister}>
				<h3>Create new account</h3>
				<span>
					Email:<sup>*</sup>
				</span>
				<input
					required
					type='email'
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
