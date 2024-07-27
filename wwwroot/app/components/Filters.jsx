import styles from './Filters.module.css'

export default function Filters() {
	return (
		<div className={styles.filtersWrap}>
			<span>
				<input type='checkbox' name='Gold' />
				Gold
			</span>
			<span>
				<input type='checkbox' name='Silver' />
				Silver
			</span>
			<span>
				<input type='checkbox' name='White gold' />
				White gold
			</span>
			<span>
				<input type='checkbox' name='Gold-plated silver' />
				Gold-plated silver
			</span>
			<span>
				<input type='checkbox' name='Titanium' />
				Titanium
			</span>
			<span>
				<input type='checkbox' name='With stone' />
				With stone
			</span>
			<span>
				<input type='checkbox' name='Without stone' />
				Without stone
			</span>
		</div>
	)
}
