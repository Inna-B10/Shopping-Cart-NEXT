import { Prosto_One } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import CategoryMenu from './CategoryMenu'
import styles from './NavBar.module.css'

const prosto = Prosto_One({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-prosto',
	display: 'swap',
})

const NavBar = () => {
	return (
		<nav className={`${styles.navBar} ${prosto.variable}`}>
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
				<Image
					src={'../../images/icons/search.svg'}
					width={24}
					height={24}
					alt='Search icon'
				/>
			</div>
			<ul className={`${styles.userMenu} flex`}>
				<li>
					<Link href='/Favorites'>
						<Image
							src='../../images/icons/favUserNotLogged.svg'
							width={32}
							height={32}
							alt='Favorites icon'
						/>
					</Link>
				</li>
				<li>
					<Link href='/ShoppingCart'>
						<Image
							src='../../images/icons/bagUserNotLogged.svg'
							width={32}
							height={32}
							alt='Shopping bag icon'
						/>
					</Link>
				</li>
				<li>
					<Link href='/Account'>
						<Image
							src='../../images/icons/userNotLogged.svg'
							width={32}
							height={32}
							alt='User account icon'
						/>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
