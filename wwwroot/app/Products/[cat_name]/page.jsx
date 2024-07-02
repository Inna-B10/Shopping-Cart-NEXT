import { Cinzel_Decorative } from 'next/font/google'
import Image from 'next/image'
import ProductCart from '../../components/ProductCart'
import { fetchData } from '../../lib/fetchData'
import styles from './page.module.css'

const cinzel = Cinzel_Decorative({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-cinzel',
	display: 'swap',
})

export default async function Products({ params }) {
	const { cat_name } = params
	let initialData = []
	try {
		const data = await fetchData(
			`http://localhost:5176/Shop/Products?cat_name=${cat_name}`
		)
		initialData = data.listProducts
	} catch (error) {
		console.error('Failed to fetch products list data:', error)
	}

	return (
		<>
			<div>
				<h1 className={`${styles.catName} ${cinzel.variable}`}>{cat_name}</h1>
			</div>
			<div className={styles.filters}>
				<Image
					src='../../../images/icons/filters.svg'
					width={38}
					height={38}
					alt='Filters icon'
				/>
			</div>
			<div className={`${styles.galleryWrapper} flex`}>
				{initialData && initialData.length > 0 ? (
					initialData.map((item, index) => (
						<ProductCart
							key={index}
							index={index}
							item={item}
							handle='addItem'
						/>
					))
				) : (
					<p>{initialData ? 'Category is empty' : 'No data'}</p>
				)}
				<div className='clear'></div>
			</div>
		</>
	)
}
