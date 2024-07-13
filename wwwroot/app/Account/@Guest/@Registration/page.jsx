'use client'
import Modal from '@/app/components/Modal'
import { useUser } from '@/app/UserContext'
import axios from 'axios'
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
	const [modalText, setModalText] = useState(null)
	const [modalShow, setModalShow] = useState(false)

	const handleRegister = async event => {
		event.preventDefault()
		try {
			const response = await axios.post(
				'http://localhost:5176/Users/Registration',
				{
					user_email: email,
					user_password: password,
					user_Fname: firstName,
					user_Lname: lastName,
				}
			)
			console.log(response)
			if (response.data.statusCode === 201) {
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
			// console.error('AxiosError:', error)
		}
	}
	const handleCloseModal = () => {
		setModalShow(false)
		if (isSuccess) {
			// TODO
			//*[ ] check cookies: if exist Favorites and/or ShoppingCart insert them into DB and delete from cookies
			//*[ ] change userIcon
			//*[ ]  change email input type
			setIsSuccess(false)
			setUserLevel('0')
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
