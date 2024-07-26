'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './ToTopButton.module.css'

export default function ToTopButton() {
	const [showToTop, setShowToTop] = useState(false)

	const handleVisibleButton = () => {
		setShowToTop(window.scrollY > 300)
	}

	const handleScrollUp = () => {
		document.querySelector('header').scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		window.addEventListener('scroll', handleVisibleButton)
	}, [])

	return (
		<div
			className={showToTop ? styles.goTop : styles.goTopHidden}
			onClick={handleScrollUp}>
			<Image
				role='button'
				src='./images/icons/toTop.svg'
				width={30}
				height={30}
				alt='to top button'
			/>
		</div>
	)
}
