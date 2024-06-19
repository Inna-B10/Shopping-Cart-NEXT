import ProductCart from '../components/ProductCart'
import { fetchData } from '../lib/fetchData'

export default async function ShoppingCart() {
	let initialData = []
	try {
		initialData = await fetchData('http://localhost:5176/Shop/ShoppingCart')
	} catch (error) {
		console.error('Failed to fetch shopping cart data:', error)
	}

	return (
		<div>
			<div className='banner'>
				<div className='banner-layer'>
					<h1 className='title-w3layouts'>
						<span className='fa fa-cart-arrow-down' aria-hidden='true'></span>
						shopping cart
					</h1>
				</div>
				<div className='wthreeproductdisplay'>
					<div className='container'>
						<div className='top-grid'>
							{initialData.length > 0
								? initialData.map((item, index) => (
										<ProductCart
											key={index}
											index={index}
											item={item}
											handle='removeItem'
										/>
								  ))
								: 'No data'}
							<div className='clear'></div>
						</div>
					</div>
				</div>
				<div className='copyright text-center'>
					<p>footer</p>
				</div>
			</div>
		</div>
	)
}
