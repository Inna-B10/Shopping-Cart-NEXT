import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='notFound'>
			<h2>Error 404 - Page not Found</h2>
			<p>Could not find requested resource</p>
			<Link href='/'>Return to Home</Link>
		</div>
	)
}
