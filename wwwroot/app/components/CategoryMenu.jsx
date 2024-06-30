import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchData } from '../lib/fetchData'
import styles from './CategoryMenu.module.css'

export default function CategoryMenu() {
	const categories = [
		{ name: 'Images', path: '/Images' },
		{ name: 'Rings', path: '/Rings' },
		{ name: 'Products', path: '/Products' },
		{ name: 'Silver earrings', path: '/Silver-earrings' },
	]

	const [initialData, setInitialData] = useState()

	useEffect(() => {
		async function getData() {
			try {
				const data = await fetchData('http://localhost:5176/Shop/Categories')
				setInitialData(data.listCategories)
				console.log(data)
			} catch (error) {
				console.error('Failed to fetch shopping cart data:', error)
			}
		}
		getData()
	}, [])

	return (
		<ul className={styles.catLinks}>
			{categories.map(category => (
				<li key={category.name}>
					<Link href={category.path}>{category.name}</Link>
				</li>
			))}
			<li>------------------</li>
			{initialData
				? initialData.length > 0
					? initialData.map((item, index) => (
							<li key={index}>
								<Link href={`/${item.cat_name}`}>{item.cat_name}</Link>
							</li>
					  ))
					: 'No data'
				: 'category list is empty'}
		</ul>
	)
}
