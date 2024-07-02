import Link from 'next/link'
import CategoryMenu from './CategoryMenu'
import styles from './NavBar.module.css'

const NavBar = () => {
	return (
		<nav className={styles.navBar}>
			<ul className={`${styles.siteMenu} flex`}>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					Categories
					<div className={styles.categoryMenu}>
						<CategoryMenu />
					</div>
				</li>
				<li>
					<Link href='/#contact'>Contact</Link>
				</li>
			</ul>
			<div className={styles.searchField}>
				<input type='text' name='searchField' />
			</div>
			<ul className={`${styles.siteMenu} flex`}>
				<li>
					<Link href='/Favorites'>Favorites</Link>
				</li>
				<li>
					<Link href='/ShoppingCart'>Shopping cart</Link>
				</li>
				<li>
					<Link href='/Account'>Account</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
