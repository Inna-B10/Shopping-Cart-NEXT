import Link from 'next/link'
import styles from './CategoryMenu.module.css'

const CategoryMenu = () => {
	const categories = [
		{ name: 'Gold rings', path: '/Gold-rings' },
		{ name: 'Silver rings', path: '/Silver-rings' },
		{ name: 'Gold earrings', path: '/Gold-earrings' },
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
