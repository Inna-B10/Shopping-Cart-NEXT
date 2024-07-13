'use client'
import { useUser } from '@/app/UserContext'
import Image from 'next/image'
import Link from 'next/link'

export default function IconUser() {
	const { userLevel } = useUser()
	return (
		<>
			<Link href='/Account'>
				{userLevel == '-1' ? (
					<Image
						src='../../images/icons/userNotLogged.svg'
						width={32}
						height={32}
						alt='User account icon'
					/>
				) : (
					<Image
						src='../../images/icons/userLogged.svg'
						width={32}
						height={32}
						alt='User account icon'
					/>
				)}
			</Link>
		</>
	)
}
