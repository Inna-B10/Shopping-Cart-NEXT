'use client'
import { useUser } from '@/app/UserContext'
import Image from 'next/image'
import Link from 'next/link'
import styles from './IconNavBag.module.css'

export default function IconNavBag() {
	const { bagCount } = useUser()

	return (
		<div className={styles.icon}>
			<Link href='/ShoppingCart' title='View shopping cart'>
				<Image
					src='../../images/icons/bagUser.svg'
					width={32}
					height={32}
					alt='Shopping bag icon'
				/>
				{bagCount > 0 && <span className={styles.badge}>{bagCount}</span>}
			</Link>
		</div>
	)
}
