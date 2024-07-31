'use client'
import { useState } from 'react'
import styles from './SortBy.module.css'

/* 🠙  🠛   ▼  ▲  ˅  ˄  ⇩  ⇧  ᐁ  ᐃ*/
const options = [
	{ id: 'dateAZ', value: 'dateAZ', label: 'Date 🠙' },
	{ id: 'dateZA', value: 'dateZA', label: 'Date 🠛' },
	{ id: 'nameAZ', value: 'nameAZ', label: 'Name A-Z' },
	{ id: 'nameZA', value: 'nameZA', label: 'Name Z-A' },
	{ id: 'priceAZ', value: 'priceAZ', label: 'Price 🠙' },
	{ id: 'priceZA', value: 'priceZA', label: 'Price 🠛' },
]

export default function SortBy() {
	const [isExpanded, setIsExpanded] = useState(false)
	const [selectedItem, setSelectedItem] = useState({ value: '', label: '' })
	console.log(isExpanded)

	const handleToggleChange = () => {
		setIsExpanded(!isExpanded)
		console.log(isExpanded)
	}
	const handleOptionChange = e => {
		const selectedOption = options.find(
			option => option.value === e.target.value
		)
		setSelectedItem(selectedOption)
		setIsExpanded(false)
	}
	return (
		<div className={styles.select}>
			<ul className={isExpanded ? styles.expanded : ''}>
				{options.map(option => (
					<li key={option.id} className={styles.selectOption}>
						<input
							type='radio'
							id={option.id}
							value={option.value}
							name='sortOption'
							onChange={handleOptionChange}
						/>
						<label htmlFor={option.id}>{option.label}</label>
					</li>
				))}
			</ul>
			{/* <input
				type='checkbox'
				id='toggle'
				className={styles.toggle}
				onChange={handleToggleChange}
			/>
			<label htmlFor='toggle'>{selectedItem.label || 'Sort by'}</label> */}
			<div
				id='toggle'
				className={isExpanded ? styles.toggleChecked : styles.toggle}
				onClick={handleToggleChange}>
				{selectedItem.label || 'Sort by'}
			</div>
		</div>
	)
}
