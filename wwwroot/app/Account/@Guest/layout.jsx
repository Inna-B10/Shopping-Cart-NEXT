'use client'
import Link from 'next/link'

export default function GuestLayout({ children, Login, Registration }) {
	// console.log(Login)
	return (
		<>
			<div>
				<Link href='/Login'>Login</Link>
				<Link href='/Registration'>Registration</Link>
			</div>
			<div>{children}</div>
			<div>{Login}</div>
			<div>{Registration}</div>
		</>
	)
}
