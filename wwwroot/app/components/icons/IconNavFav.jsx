'use client'
import { useUser } from '@/app/UserContext'
import Image from 'next/image'
import Link from 'next/link'
import styles from './IconNavBag.module.css'

export default function IconNavFav() {
	const { favCount } = useUser()

	return (
		<div className={styles.icon}>
			<Link href='/Favorites' title='View favorites'>
				<Image
					src='../../images/icons/favUser.svg'
					width={32}
					height={32}
					alt='Favorites icon'
				/>
				{favCount > 0 && <span className={styles.badge}>{favCount}</span>}
			</Link>
		</div>
	)
}
