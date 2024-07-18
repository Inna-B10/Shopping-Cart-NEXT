// import { El_Messiri, Marcellus } from 'next/font/google'

import { Marcellus } from 'next/font/google'
import { cookies } from 'next/headers'
import Footer from './components/Footer'
import Header from './components/Header'
import './globals.css'
import { UserProvider } from './UserContext'

const marcellus = Marcellus({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-marcellus',
	display: 'swap',
})

// const messiri = El_Messiri({
// 	weight: ['400', '700'],
// 	subsets: ['latin'],
// 	variable: '--font-messiri',
// 	display: 'swap',
// })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
	// Getting cookies on the server side
	const cookieStore = cookies()
	const userId = cookieStore.get('userId')?.value || '-1'
	const cartItems = cookieStore.get('cartItems')?.value || '[]'
	const favItems = cookieStore.get('favItems')?.value || '[]'

	return (
		<html lang='en'>
			<body
				// className={`${marcellus.variable} ${messiri.variable} ${prosto.variable}`}>
				className={marcellus.variable}>
				<UserProvider
					initialUserId={userId}
					initialCartItems={cartItems}
					initialFavorites={favItems}>
					<Header />
					{children}
					<Footer />
				</UserProvider>
			</body>
		</html>
	)
}
