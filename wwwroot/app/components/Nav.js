import ActiveLink from './ActiveLink'

const Nav = () => (
	<nav>
		<ul className='nav'>
			<li>
				<ActiveLink
					className='nav-link'
					activeClassName='active'
					href='/'
					passHref>
					Home
				</ActiveLink>
			</li>
			<li>
				<ActiveLink
					className='nav-link'
					activeClassName='active'
					href='/Category'
					passHref>
					Category
				</ActiveLink>
			</li>
			<li>
				<ActiveLink
					className='nav-link'
					activeClassName='active'
					href='/Rings/[slug]'
					passHref
					as='/dynamic-route'>
					Dynamic route
				</ActiveLink>
			</li>
		</ul>
	</nav>
)
export default Nav
