// 'use client'
// import { Button, TextField, Typography } from '@mui/material'
// import { useState } from 'react'
//
// export default function Login({ onSubmit }) {
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
//
// 	const handleSubmit = event => {
// 		event.preventDefault()
// 		onSubmit({ email, password })
// 	}
//
// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<Typography variant='h6' gutterBottom>
// 				Вход
// 			</Typography>
// 			<TextField
// 				label='Email'
// 				variant='outlined'
// 				margin='normal'
// 				fullWidth
// 				value={email}
// 				onChange={e => setEmail(e.target.value)}
// 			/>
// 			<TextField
// 				label='Пароль'
// 				type='password'
// 				variant='outlined'
// 				margin='normal'
// 				fullWidth
// 				value={password}
// 				onChange={e => setPassword(e.target.value)}
// 			/>
// 			<Button type='submit' variant='contained' color='primary' fullWidth>
// 				Войти
// 			</Button>
// 		</form>
// 	)
// }

// import { Button, TextField, Typography } from '@mui/material'
//
// export default function Login({ onSubmit }) {
// 	return (
// 		<form>
// 			<Typography variant='h6' gutterBottom>
// 				Вход
// 			</Typography>
// 			<TextField
// 				label='Email'
// 				variant='outlined'
// 				margin='normal'
// 				fullWidth
// 				// value={email}
// 			/>
// 			<TextField
// 				label='Пароль'
// 				type='password'
// 				variant='outlined'
// 				margin='normal'
// 				fullWidth
// 				// value={password}
// 			/>
// 			<Button type='submit' variant='contained' color='primary' fullWidth>
// 				Войти
// 			</Button>
// 		</form>
// 	)
// }
export default function LoginForm() {
	return (
		<>
			<h2>LoginForm</h2>
		</>
	)
}
