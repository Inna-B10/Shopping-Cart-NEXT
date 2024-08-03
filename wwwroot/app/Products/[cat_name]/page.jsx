'use client'
import FiltersMenu from '@/app/components/FiltersMenu'
import axios, { AxiosError } from 'axios'
import { Cinzel_Decorative } from 'next/font/google'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ProductCart from '../../components/ProductCart'
import SortByMenu from './../../components/SortByMenu'
import styles from './page.module.css'

const cinzel = Cinzel_Decorative({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-cinzel',
	display: 'swap',
})

const options = [
	{ id: 'dateAZ', value: 'dateAZ', label: 'Date 🠙' },
	{ id: 'dateZA', value: 'dateZA', label: 'Date 🠛' },
	{ id: 'nameAZ', value: 'nameAZ', label: 'Name 🠙' },
	{ id: 'nameZA', value: 'nameZA', label: 'Name 🠛' },
	{ id: 'priceAZ', value: 'priceAZ', label: 'Price 🠙' },
	{ id: 'priceZA', value: 'priceZA', label: 'Price 🠛' },
]

Products.propTypes = {
	params: PropTypes.shape({
		cat_name: PropTypes.string,
	}),
}

export default function Products({ params }) {
	const [selectedSortBy, setSelectedSortBy] = useState(options[1])
	const [initialData, setInitialData] = useState()
	const [sortedData, setSortedData] = useState([])
	const [selectedFilters, setSelectedFilters] = useState([])
	const [tags, setTags] = useState([])

	let { cat_name } = params
	let queryName
	if (cat_name && cat_name.includes('Discount-')) {
		const nameArr = cat_name.split('-')
		queryName = nameArr[1] + '%'
		cat_name = cat_name + '%'
	} else {
		queryName = cat_name
	}
	console.log(queryName)

	//GET PRODUCTS
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

	//GET ALL TAGS/FILTERS
	useEffect(() => {
		if (initialData) {
			const uniqueTags = new Set()
			initialData.forEach(product => {
				product.p_tags.split(',').forEach(tag => uniqueTags.add(tag.trim()))
			})
			setTags([...uniqueTags])
		}
	}, [initialData])

	//SORT BY
	useEffect(() => {
		// Ensure initialData is an array before sorting
		if (Array.isArray(initialData)) {
			const newList = [...initialData].sort((a, b) => {
				const priceA =
					a.p_price_discounted > 0 ? a.p_price_discounted : a.p_price
				const priceB =
					b.p_price_discounted > 0 ? b.p_price_discounted : b.p_price

				switch (selectedSortBy.value) {
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
	}, [selectedSortBy, initialData])

	// Функция фильтрации
	const filterProducts = (products, filters) => {
		return products.filter(product => {
			let matchesTags = true
			let matchesStone = true

			if (filters.tags.length > 0) {
				matchesTags = filters.tags.some(tag => {
					const productTags = product.p_tags.split(',').map(t => t.trim())
					return productTags.includes(tag)
				})
			}

			if (filters.stone !== null) {
				matchesStone = product.p_is_stone === filters.stone
			}

			return matchesTags && matchesStone
		})
	}

	useEffect(() => {
		if (initialData) {
			const filteredData = filterProducts(initialData, {
				tags: selectedFilters
					.filter(f => f.value !== 'stone' && f.value !== 'noStone')
					.map(f => f.value),
				stone: selectedFilters.some(f => f.value === 'stone')
					? true
					: selectedFilters.some(f => f.value === 'noStone')
					? false
					: null,
			})
			setSortedData(filteredData)
		}
	}, [selectedFilters, initialData])

	return (
		<>
			<h1 className={`${styles.catName} ${cinzel.variable}`}>{cat_name}</h1>
			<div className={styles.filterSort}>
				<FiltersMenu
					selectedFilters={selectedFilters}
					setSelectedFilters={setSelectedFilters}
					options={tags}
				/>
				<SortByMenu
					selectedSortBy={selectedSortBy}
					setSelectedSortBy={setSelectedSortBy}
					options={options}
				/>
			</div>
			<div className={`${styles.galleryWrapper} flex`}>
				{initialData && initialData.length > 0 ? (
					sortedData.length > 0 ? (
						sortedData.map((item, index) => (
							<ProductCart key={index} index={index} item={item} />
						))
					) : (
						<p>No product found matching your request</p>
					)
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
