'use client'
import Link from 'next/link'
import { useState } from 'react'
import CategoryMenu from './CategoryMenu'
import styles from './NavBar.module.css'

const NavBar = () => {
	const [showCategories, setShowCategories] = useState(false)

	return (
		<nav className={styles.navMenu}>
			<Link href='/'>Home</Link>&nbsp;|&nbsp;
			<span
				onMouseEnter={() => setShowCategories(true)}
				onMouseLeave={() => setShowCategories(false)}>
				Categories
				{showCategories && <CategoryMenu />}
			</span>
			&nbsp; |&nbsp;<Link href='/#contact'>Contact</Link>
			&nbsp;|&nbsp;<Link href='/ShoppingCart'>Shopping cart</Link>
		</nav>
	)
}

export default NavBar
