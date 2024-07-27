import styles from './SortBy.module.css'

export default function SortBy() {
	return (
		<div className={styles.selectWrap}>
			<select name='sortBy'>
				<option value='select' disabled selected>
					Sort by
				</option>
				<option value='nameAZ'>Name, A-Z</option>
				<option value='nameZA'>Name, Z-A</option>
				<option value='priceAZ'>Price, ↑</option>
				<option value='priceZA'>Price, ↓</option>
				<option value='dateAZ'>Date, ↑</option>
				<option value='dateZA'>Date, ↓</option>
			</select>
		</div>
	)
}
