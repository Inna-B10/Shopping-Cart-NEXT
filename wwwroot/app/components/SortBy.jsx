'use client'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './SortBy.module.css'

SortBy.propTypes = {
	selectedOption: PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.string,
		label: PropTypes.string,
	}).isRequired,
	setSelectedOption: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
}

export default function SortBy({ selectedOption, setSelectedOption, options }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleToggleChange = () => {
		setIsExpanded(!isExpanded)
	}

	const handleOptionChange = e => {
		const selected = options.find(option => option.value === e.target.value)
		setSelectedOption(selected)
		setIsExpanded(false)
	}
	return (
		<div className={styles.select}>
			{isExpanded && (
				<ul>
					{options.map(option => (
						<li key={option.id} className={styles.selectOption}>
							<input
								type='radio'
								id={option.id}
								value={option.value}
								onChange={handleOptionChange}
							/>
							<label htmlFor={option.id}>{option.label}</label>
						</li>
					))}
				</ul>
			)}
			<div
				className={isExpanded ? styles.toggleChecked : styles.toggle}
				onClick={handleToggleChange}>
				{selectedOption.label || 'Sort by'}
			</div>
		</div>
	)
}
