'use client'
import Link from 'next/link'
import { useState } from 'react'
import CategoryMenu from './CategoryMenu'
import styles from './NavBar.module.css'

const NavBar = () => {
	const [showCategories, setShowCategories] = useState(false)

	return (
		<nav className={styles.navMenu}>
			<ul className={`${styles.menuLinks} flex`}>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<span
						onMouseEnter={() => setShowCategories(true)}
						onMouseLeave={() => setShowCategories(false)}>
						Categories
						{showCategories && <CategoryMenu />}
					</span>
				</li>
				<li>
					<Link href='/#contact'>Contact</Link>
				</li>
			</ul>
			<div className={styles.searchField}>
				<input type='text' name='searchField' />
			</div>
			<ul className={`${styles.menuLinks} flex`}>
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
