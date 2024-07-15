'use client'
import middleware from '@/middleware'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUser } from './../UserContext'

export default function AccountLayout({ Guest, UserInfo, children }) {
	const { userId } = useUser()
	const router = useRouter()
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		if (userId !== undefined && userId !== null) {
			setIsReady(true)
		}
	}, [userId])

	useEffect(() => {
		if (userId === undefined || userId === null) {
			middleware()
		}
	}, [userId, router])

	if (!isReady) {
		return <div>Loading...</div>
	}

	return <>{userId === '-1' ? Guest : UserInfo}</>
}
