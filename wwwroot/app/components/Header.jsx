'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Nav from './Nav'

const navLinks = [
	{ title: 'Home', path: '/' },
	{ title: 'Rings', path: '/Rings' },
	// { title: 'Bracelets', path: '/bracelets' },
]
export const MyNav = () => {
	const router = useRouter()

	return (
		<ul>
			{navLinks.map(link => (
				<li key={link.title}>
					<Link
						href={link.path}
						passHref
						className={router.pathname === link.path ? 'activeLink' : ' '}>
						{link.title}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default function Header() {
	return (
		<header>
			<Nav />
			luxGleam
			<MyNav />
		</header>
	)
}
