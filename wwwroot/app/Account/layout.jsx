'use client'
import middleware from '@/middleware'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUser } from './../UserContext'

export default function AccountLayout({ Guest, UserInfo, children }) {
	const { userLevel } = useUser()
	const router = useRouter()
	const [isReady, setIsReady] = useState(false)

	console.log('AccountLayout:', userLevel)

	useEffect(() => {
		if (userLevel !== undefined && userLevel !== null) {
			setIsReady(true)
		}
	}, [userLevel])

	useEffect(() => {
		if (userLevel === undefined || userLevel === null) {
			middleware()
			// router.replace('/')
		}
	}, [userLevel, router])

	if (!isReady) {
		return <div>Loading...</div>
	}

	return <>{userLevel == '-1' ? Guest : UserInfo}</>
}
