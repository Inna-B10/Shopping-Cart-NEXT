import Link from 'next/link'
import ImageCart from '../components/ImageCart'
import { fetchData } from '../lib/fetchData'

export default async function Images() {
	let initialData = []
	try {
		const data = await fetchData('http://localhost:5176/Shop/Images')
		initialData = data.listImages
		console.log(initialData)
	} catch (error) {
		console.error('Failed to fetch products list data:', error)
	}

	return (
		<div>
			<div className='banner'>
				<div className='banner-layer'>
					<h1 className='title-w3layouts'>Products list</h1>
				</div>
				<div className='wthreeproductdisplay'>
					<div className='container'>
						<div className='top-grid'>
							{initialData
								? initialData.length > 0
									? initialData.map((item, index) => (
											<ImageCart
												key={index}
												index={index}
												item={item}
												handle='addItem'
											/>
									  ))
									: 'No data'
								: 'initialData is empty'}
							<div className='clear'></div>
						</div>
					</div>
				</div>
				<div className='wthreecartaits wthreecartaits2 cart cart box_1'>
					<Link href='/ShoppingCart'>
						<button className='w3view-cart'>
							view cart
							<span className='fa fa-cart-arrow-down' aria-hidden='true'></span>
						</button>
					</Link>
				</div>
				<div className='copyright text-center'>
					<p>footer</p>
				</div>
			</div>
		</div>
	)
}
