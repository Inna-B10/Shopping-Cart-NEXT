'use client'
import { useState } from 'react'
import styles from './IconHamburger.module.css'

export default function IconHamburger() {
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<button
			onClick={handleClick}
			className={`flex column ${styles.hamburger} ${isOpen && styles.open}`}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	)
}
