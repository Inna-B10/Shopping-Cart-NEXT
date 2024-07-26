'use client'
import Link from 'next/link'
import { useState } from 'react'
import CategoryMenu from '../markup/CategoryMenu'
import styles from './IconHamburger.module.css'

export default function IconHamburger() {
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen(!isOpen)
	}
	const closeMenu = () => {
		setIsOpen(false)
	}

	return (
		<>
			<button
				onClick={handleClick}
				className={`flex column ${styles.hamburger} ${isOpen && styles.open}`}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			{isOpen && (
				<ul className={styles.hamMenu}>
					<li>
						<Link href='/' title='Home' onClick={closeMenu}>
							Home
						</Link>
					</li>
					<li>
						<Link href='/#contact' onClick={closeMenu}>
							Contact
						</Link>
					</li>
					<li>Categories:</li>
					<li className={styles.categoryMenu}>
						<CategoryMenu closeMenu={closeMenu} />
					</li>
				</ul>
			)}
		</>
	)
}
