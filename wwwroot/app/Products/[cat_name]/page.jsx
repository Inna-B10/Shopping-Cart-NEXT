'use client'
import Filters from '@/app/components/Filters'
import SortBy from '@/app/components/SortBy'
import axios, { AxiosError } from 'axios'
import { Cinzel_Decorative } from 'next/font/google'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ProductCart from '../../components/ProductCart'
import styles from './page.module.css'

const cinzel = Cinzel_Decorative({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-cinzel',
	display: 'swap',
})

Products.propTypes = {
	params: PropTypes.shape({
		cat_name: PropTypes.string,
	}),
}

export default function Products({ params }) {
	const [initialData, setInitialData] = useState()

	let { cat_name } = params
	let queryName
	if (cat_name && cat_name.includes('Discount-')) {
		const nameArr = cat_name.split('-')
		queryName = nameArr[1] + '%'
		cat_name = cat_name + '%'
	} else {
		queryName = cat_name
	}

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5176/Shop/Products?cat_name=' + queryName
				)
				setInitialData(response.data.listProducts)
			} catch (error) {
				console.error(error, AxiosError)
				return null
			}
		}
		getData()
	}, [queryName])

	return (
		<>
			<h1 className={`${styles.catName} ${cinzel.variable}`}>{cat_name}</h1>

			<div className={styles.filtersPopup}>
				<Filters />
			</div>
			<div className={styles.filterSort}>
				<div className={styles.filters}>
					<span className={styles.filtersMore}>
						<Image
							src='../../../images/icons/filters.svg'
							width={24}
							height={24}
							alt='Filters icon'
						/>{' '}
						More filters
					</span>
					<span className={styles.filtersGroup}>
						{/* //! //FIXME double ID!!! filtersPopup*/}
						<Filters />
					</span>
				</div>
				<SortBy />
			</div>
			<div className={`${styles.galleryWrapper} flex`}>
				{initialData && initialData.length > 0 ? (
					initialData.map((item, index) => (
						<ProductCart key={index} index={index} item={item} />
					))
				) : (
					<p>
						{initialData
							? 'Could not connect to get data. Please, try again later.'
							: 'No items in this category'}
					</p>
				)}
			</div>
		</>
	)
}
