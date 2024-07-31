import Filters from '@/app/components/Filters'
import SortBy from '@/app/components/SortBy'
import { Cinzel_Decorative } from 'next/font/google'
import Image from 'next/image'
import PropTypes from 'prop-types'
import ProductCart from '../../components/ProductCart'
import { fetchData } from '../../lib/fetchData'
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

export default async function Products({ params }) {
	let { cat_name } = params
	let queryName
	if (cat_name && cat_name.includes('Discount-')) {
		const nameArr = cat_name.split('-')
		queryName = nameArr[1] + '%'
		cat_name = cat_name + '%'
	} else {
		queryName = cat_name
	}
	let initialData = []
	try {
		const data = await fetchData(
			`http://localhost:5176/Shop/Products?cat_name=${queryName}`
		)
		initialData = data.listProducts
	} catch (error) {
		console.error('Failed to fetch products list data:', error)
	}

	return (
		<>
			<h1 className={`${styles.catName} ${cinzel.variable}`}>{cat_name}</h1>

			<div className={styles.filtersGroup}>
				<Filters />
			</div>
			<div className={styles.filterSort}>
				<div className={styles.filters}>
					<Image
						src='../../../images/icons/filters.svg'
						width={38}
						height={38}
						alt='Filters icon'
					/>{' '}
					More filters
					{/* <Filters /> */}
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
