// import Link from 'next/link'
import ProductCart from '../../components/ProductCart'
import { fetchData } from '../../lib/fetchData'

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
		<div>
			<div>
				<div>
					<h1>{cat_name}</h1>
				</div>
				<div>
					<div>
						<div className='flex'>
							{initialData
								? initialData.length > 0
									? initialData.map((item, index) => (
											<ProductCart
												key={index}
												index={index}
												item={item}
												handle='addItem'
											/>
									  ))
									: 'Category is empty'
								: 'No data'}
							<div className='clear'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
