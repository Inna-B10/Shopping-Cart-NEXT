import styles from './Filters.module.css'

export default function Filters() {
	return (
		<div className={styles.wrapper}>
			<div className={`${styles.filtersInnerWrap} ${styles.isStone}`}>
				<span>
					<input
						className={styles.stoneBox}
						type='checkbox'
						id='stone'
						value='stone'
					/>
					<label htmlFor='stone'>With stone</label>
				</span>
				<span>
					<input
						className={styles.stoneBox}
						type='checkbox'
						id='noStone'
						value='noStone'
					/>
					<label htmlFor='noStone'>Without stone</label>
				</span>
			</div>
			<div className={styles.filtersInnerWrap}>
				<span>
					<input
						className={styles.stuffBox}
						type='checkbox'
						id='gold'
						value='gold'
					/>
					<label htmlFor='gold'>Gold</label>
				</span>
				<span>
					<input
						className={styles.stuffBox}
						type='checkbox'
						id='silver'
						value='silver'
					/>
					<label htmlFor='silver'>Silver</label>
				</span>
				<span>
					<input
						className={styles.stuffBox}
						type='checkbox'
						id='whiteGold'
						value='white gold'
					/>
					<label htmlFor='whiteGold'>White gold</label>
				</span>
				<span>
					<input
						className={styles.stuffBox}
						type='checkbox'
						id='titanium'
						value='titanium'
					/>
					<label htmlFor='titanium'>Titanium</label>
				</span>
				<span>
					<input
						className={styles.stuffBox}
						type='checkbox'
						id='goldPlated'
						value='gold-plated silver'
					/>
					<label htmlFor='goldPlated'>Gold-plated silver</label>
				</span>
			</div>
		</div>
	)
}
