import Link from 'next/link'
import { fetchData } from '../../lib/fetchData'
import styles from './CategoryMenu.module.css'

export default async function CategoryMenu() {
	let categories = []

	try {
		const data = await fetchData('http://localhost:5176/Shop/Categories', {
			next: { revalidate: 60 },
		})
		categories = data.listCategories || []
	} catch (error) {
		console.error('Error fetching categories:', error)
		return null
	}

	return (
		<ul className={styles.catLinks}>
			{categories.length > 0
				? categories.map(
						(item, index) =>
							item.cat_name.trim() !== '' && (
								<li key={index}>
									{item.cat_name.includes('%') ? (
										<Link
											href={`../Products/Discount-${item.cat_name.replace(
												'%',
												''
											)}`}>
											Discount {item.cat_name}
										</Link>
									) : (
										<Link href={`../Products/${item.cat_name}`}>
											{item.cat_name.charAt(0).toUpperCase() +
												item.cat_name.slice(1)}
										</Link>
									)}
								</li>
							)
				  )
				: 'No data'}
		</ul>
	)
}
