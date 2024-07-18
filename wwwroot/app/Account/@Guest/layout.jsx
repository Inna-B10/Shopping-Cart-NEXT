'use client'
import PropTypes from 'prop-types'
import { useState } from 'react'
import LoginPage from './@Login/page'
import Registration from './@Registration/page'
import styles from './layout.module.css'

GuestLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default function GuestLayout({ children }) {
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
				{activeTab === 'login' && <LoginPage />}
				{activeTab === 'registration' && <Registration />}
			</div>
		</>
	)
}
