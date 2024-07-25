import styles from './Header.module.css'
import NavBar from './NavBar'

export default function Header() {
	return (
		<header className={`${styles.header} flex column`}>
			<NavBar />
			<div className={styles.searchField}>
				<input type='text' name='searchField' aria-label='search' />
			</div>
			{/* <Image
				className={styles.logoImg}
				src='/images/logo.png'
				priority={true}
				width={382}
				height={53}
				alt='Logo'
			/> */}
		</header>
	)
}
