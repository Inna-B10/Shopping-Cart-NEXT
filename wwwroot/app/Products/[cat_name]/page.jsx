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
/* 🠙  🠛   ▼  ▲  ˅  ˄  ⇩  ⇧  ᐁ  ᐃ*/
const options = [
	{ id: 'dateAZ', value: 'dateAZ', label: 'Date 🠙' },
	{ id: 'dateZA', value: 'dateZA', label: 'Date 🠛' },
	{ id: 'nameAZ', value: 'nameAZ', label: 'Name A-Z' },
	{ id: 'nameZA', value: 'nameZA', label: 'Name Z-A' },
	{ id: 'priceAZ', value: 'priceAZ', label: 'Price 🠙' },
	{ id: 'priceZA', value: 'priceZA', label: 'Price 🠛' },
]

Products.propTypes = {
	params: PropTypes.shape({
		cat_name: PropTypes.string,
	}),
}

export default function Products({ params }) {
	const [selectedOption, setSelectedOption] = useState(options[1])
	const [initialData, setInitialData] = useState()
	const [sortedData, setSortedData] = useState([])

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
		const getProducts = async () => {
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
		getProducts()
	}, [queryName])

	useEffect(() => {
		// Ensure initialData is an array before sorting
		if (Array.isArray(initialData)) {
			const newList = [...initialData].sort((a, b) => {
				const priceA =
					a.p_price_discounted > 0 ? a.p_price_discounted : a.p_price
				const priceB =
					b.p_price_discounted > 0 ? b.p_price_discounted : b.p_price

				switch (selectedOption.value) {
					case 'dateAZ':
						return a.p_id - b.p_id
					case 'dateZA':
						return b.p_id - a.p_id
					case 'nameAZ':
						return a.p_name.localeCompare(b.p_name)
					case 'nameZA':
						return b.p_name.localeCompare(a.p_name)
					case 'priceAZ':
						return priceA - priceB
					case 'priceZA':
						return priceB - priceA
					default:
						return 0
				}
			})
			setSortedData(newList)
		}
	}, [selectedOption, initialData])

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
				<SortBy
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					options={options}
				/>
			</div>
			<div className={`${styles.galleryWrapper} flex`}>
				{initialData && initialData.length > 0 ? (
					sortedData.map((item, index) => (
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
