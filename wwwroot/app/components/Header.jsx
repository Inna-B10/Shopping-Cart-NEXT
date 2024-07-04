import Image from 'next/image'
import styles from './Header.module.css'
import NavBar from './NavBar'

export default function Header() {
	return (
		<header className={`${styles.header} flex column`}>
			<NavBar />
			<Image
				className={styles.logoImg}
				src='/images/logo.png'
				width={382}
				height={53}
				alt='Logo'
			/>
		</header>
	)
}
