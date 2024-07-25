import { Prosto_One } from 'next/font/google'
import Link from 'next/link'
import IconNavBag from '../icons/IconNavBag'
import IconNavFav from '../icons/IconNavFav'
import IconUser from '../icons/IconUser'
import CategoryMenu from './CategoryMenu'
import styles from './NavBar.module.css'

const prosto = Prosto_One({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-prosto',
	display: 'swap',
})

export default function NavBar() {
	return (
		<nav className={`${styles.navBar} ${prosto.variable} flex`}>
			<ul className={`${styles.siteMenu} flex`}>
				<li>
					<Link href='/' title='Home'>
						Home
					</Link>
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
				{/* <li>
					<IconHamburger />
				</li> */}
			</ul>
			{/* <div className={styles.searchField}>
				<input type='text' name='searchField' aria-label='search' />
			</div> */}
			<div className={styles.logoImg}>
				{/* <Image
					className={styles.logoImg}
					src='/images/logo.png'
					priority={true}
					width={382}
					height={53}
					alt='Logo'
				/> */}
			</div>
			<ul className={`${styles.userMenu} flex`}>
				<li>
					<IconNavFav />
				</li>
				<li>
					<IconNavBag />
				</li>
				<li>
					<IconUser />
				</li>
			</ul>
		</nav>
	)
}
