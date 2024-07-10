'use client'
import { useState } from 'react'
import styles from './layout.module.css'

export default function GuestLayout({ children, Login, Registration }) {
	const [activeTab, setActiveTab] = useState('login')
	return (
		<>
			<div className={styles.tabWrap}>
				<ul className={`flex ${styles.tabsTitle}`}>
					<li
						className={activeTab === 'login' ? styles.activeTab : ''}
						onClick={() => setActiveTab('login')}>
						Sign in
					</li>
					<li
						className={activeTab === 'registration' ? styles.activeTab : ''}
						onClick={() => setActiveTab('registration')}>
						Sign up
					</li>
				</ul>
				{activeTab === 'login' && Login}
				{activeTab === 'registration' && Registration}
			</div>
		</>
	)
}
