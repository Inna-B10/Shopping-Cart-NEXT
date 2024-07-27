import styles from './Header.module.css'
import NavBar from './NavBar'

export default function Header() {
	return (
		<header className={`${styles.header} flex column`}>
			<NavBar />
			<div className={styles.searchField}>
				<input type='text' name='searchField' aria-label='search' />
			</div>
		</header>
	)
}
