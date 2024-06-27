'use client'
import Link from 'next/link'
import { useState } from 'react'
import CategoryMenu from './CategoryMenu'
import styles from './NavBar.module.css'

const NavBar = () => {
	const [showCategories, setShowCategories] = useState(false)

	return (
		<nav className={styles.navMenu}>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					&nbsp;|&nbsp;
					<span
						onMouseEnter={() => setShowCategories(true)}
						onMouseLeave={() => setShowCategories(false)}>
						Categories
						{showCategories && <CategoryMenu />}
					</span>
				</li>
				<li>
					&nbsp; |&nbsp;<Link href='/#contact'>Contact</Link>
				</li>
			</ul>
			<div className={styles.searchInput}>
				<input type='text' />
			</div>
			<ul>
				<li>
					<Link href='/Favorites'>Favorites</Link>
				</li>
				<li>
					&nbsp;|&nbsp;<Link href='/ShoppingCart'>Shopping cart</Link>
				</li>
				<li>
					&nbsp; |&nbsp;<Link href='/Account'>Account</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
