import Link from 'next/link'
import { fetchData } from '../lib/fetchData'
import styles from './CategoryMenu.module.css'

export default async function CategoryMenu() {
	const initialData = [
		{ name: 'Images', path: '/Images' },
		{ name: 'Rings', path: '/Rings' },
		{ name: 'Silver earrings', path: '/Silver-earrings' },
	]
	let categories = []
	try {
		const data = await fetchData('http://localhost:5176/Shop/Categories')
		categories = await data.listCategories
	} catch (error) {
		console.error('Error fetching categories:', error)
	}

	return (
		<ul className={styles.catLinks}>
			{initialData.map(category => (
				<li key={category.name}>
					<Link href={category.path}>{category.name}</Link>
				</li>
			))}
			<li>------------------</li>
			{categories
				? categories.length > 0
					? categories.map((item, index) => (
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
										{item.cat_name}
									</Link>
								)}
							</li>
					  ))
					: 'No data'
				: 'category list is empty'}
		</ul>
	)
}
