// // 'use client'
// import Login from '@/app/components/Login'
// import Modal from '@/app/components/Modal'
//
// export default function LoginPage() {
// 	console.log('Login page')
// 	return (
// 		<>
// 			<Modal>
// 				<p>Login page</p>
// 				<Login />
// 			</Modal>
// 		</>
// 	)
// }

'use client'
import { useUser } from '@/app/UserContext'
export default function LoginPage() {
	const { userLevel, setUserLevel } = useUser()
	const handleLogin = () => {
		setUserLevel('1') // Например, устанавливаем уровень 1 при входе в систему
	}
	return (
		<div>
			<h1>Login Page</h1>
			<p>Current User Level: {userLevel}</p>
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}
