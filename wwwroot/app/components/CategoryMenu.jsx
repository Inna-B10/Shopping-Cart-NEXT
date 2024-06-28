import Link from 'next/link'
import styles from './CategoryMenu.module.css'

const CategoryMenu = () => {
	const categories = [
		{ name: 'Images', path: '/Images' },
		{ name: 'Rings', path: '/Rings' },
		{ name: 'Category', path: '/Category' },
		{ name: 'Silver earrings', path: '/Silver-earrings' },
	]

	return (
		<ul className={styles.catLinks}>
			{categories.map(category => (
				<li key={category.name}>
					<Link href={category.path}>{category.name}</Link>
				</li>
			))}
		</ul>
	)
}

export default CategoryMenu
