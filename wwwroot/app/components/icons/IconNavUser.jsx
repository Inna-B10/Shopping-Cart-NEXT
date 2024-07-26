'use client'
import { useUser } from '@/app/UserContext'
import { Cinzel_Decorative } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './IconNavUserMenu.module.css'

const cinzel = Cinzel_Decorative({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-cinzel',
	display: 'swap',
})

export default function IconUser() {
	const { userId, userData } = useUser()
	const [userIcon, setUserIcon] = useState(null)

	useEffect(() => {
		// Check if userData exists and has the necessary fields
		if (!userData || userId == '-1') {
			setUserIcon(
				<Image
					src='../../images/icons/userNotLogged.svg'
					width={32}
					height={32}
					alt='User account icon'
				/>
			)
		} else {
			// Extract first name and last name from userData
			const { user_Fname, user_Lname } = userData
			// Generate initials
			const initials = `${user_Fname.charAt(0)}${user_Lname.charAt(0)}`
			setUserIcon(
				<div className={`flex ${styles.userInitials} ${cinzel.variable}`}>
					{initials}
				</div>
			)
		}
	}, [userId, userData])

	return (
		<div className={styles.icon}>
			<Link href='/Account' title='Account'>
				{userIcon}
			</Link>
		</div>
	)
}
