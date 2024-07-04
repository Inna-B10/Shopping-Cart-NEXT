import style from './LoadingSpinner.module.css'

/**
 * A loading indicator
 *
 * HTML and CSS taken from
 * @link https://loading.io/css/
 */
export default function LoadingSpinner() {
	const color = '#D0AF51'

	return (
		<div style={{ '--color': color }} className={style['lds-roller']}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
