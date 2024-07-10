'use client'
// import { useEffect, useState } from 'react'

import { useUser } from './../UserContext'
// import getCookies from '../lib/getCookies'

export default function UserLayout({ Guest, UserInfo, children }) {
	const { userLevel, setUserLevel } = useUser()
	if (userLevel === undefined || userLevel === null) {
		// middleware()
		redirect('/')
		return null
	}
	// console.log('account layout', userLevel)

	return <>{userLevel == -1 ? Guest : UserInfo}</>
}
