'use client'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { fetchData } from '../../lib/fetchData'
import styles from './CategoryMenu.module.css'

CategoryMenu.propTypes = {
	closeMenu: PropTypes.func,
}

export default function CategoryMenu({ closeMenu }) {
	const [categories, setCategories] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await fetchData('http://localhost:5176/Shop/Categories', {
					next: { revalidate: 60 },
				})
				setCategories(data.listCategories || [])
			} catch (error) {
				console.error('Error fetching categories:', error)
				// setError(error)
				return null
			}
		}

		fetchCategories()
	}, [])

	return (
		<ul className={styles.catLinks}>
			{categories.length > 0
				? categories.map(
						(item, index) =>
							item.cat_name.trim() !== '' && (
								<li key={index}>
									{item.cat_name.includes('%') ? (
										<Link
											onClick={closeMenu}
											href={`../Products/Discount-${item.cat_name.replace(
												'%',
												''
											)}`}>
											Discount {item.cat_name}
										</Link>
									) : (
										<Link
											onClick={closeMenu}
											href={`../Products/${item.cat_name}`}>
											{item.cat_name.charAt(0).toUpperCase() +
												item.cat_name.slice(1)}
										</Link>
									)}
								</li>
							)
				  )
				: 'Error loading categories'}
		</ul>
	)
}
