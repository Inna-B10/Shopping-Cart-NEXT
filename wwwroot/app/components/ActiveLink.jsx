import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'

const ActiveLink = ({ children, activeClassName, ...props }) => {
	const { asPath } = useRouter()

	const childClassName = props.className || ''

	const className =
		asPath === props.href || asPath === props.as
			? `${childClassName} ${activeClassName}`.trim()
			: childClassName

	//console.log(props.href)
	return (
		<Link
			{...props}
			passHref
			href={props.href}
			className={{ className: className || null }}>
			{children}
		</Link>
	)
}

ActiveLink.propTypes = {
	children: PropTypes.element.isRequired,
	activeClassName: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	as: PropTypes.string,
}

export default ActiveLink
