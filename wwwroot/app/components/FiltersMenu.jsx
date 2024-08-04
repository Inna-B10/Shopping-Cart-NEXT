'use client'
import Image from 'next/image'
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from './FiltersMenu.module.css'

const animatedComponents = makeAnimated()

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props}>
			<Image
				src={'../images/icons/filters.svg'}
				width={24}
				height={24}
				alt='filters icon'
			/>
		</components.DropdownIndicator>
	)
}
const customComponents = {
	...animatedComponents,
	DropdownIndicator,
}

export default function FiltersMenu({
	selectedFilters,
	setSelectedFilters,
	options,
}) {
	const handleChange = selectedOptions => {
		setSelectedFilters(selectedOptions || [])
	}

	const filterOptions = [
		...options.map(tag => ({ value: tag, label: tag })),
		{ value: 'stone', label: 'With stone' },
		{ value: 'noStone', label: 'Without stone' },
	]

	return (
		<Select
			name='filters'
			closeMenuOnSelect={true}
			components={customComponents}
			isClearable={false}
			isSearchable={false}
			placeholder='Select filter(s)'
			isMulti
			value={selectedFilters}
			onChange={handleChange}
			options={filterOptions}
			className={styles.filtersContainer}
			classNames={{
				control: state =>
					state.isFocused
						? state.menuIsOpen
							? styles.controlListOpen
							: styles.controlFocused
						: styles.control,
				menu: state => styles.list,
				valueContainer: state => styles.valueContainer,
				multiValue: state => styles.multiValue,
				multiValueRemove: state => styles.multiValueRemove,
				indicatorsContainer: state => styles.indicatorsContainer,
				indicatorSeparator: state =>
					state.isFocused ? styles.separatorFocused : styles.separator,
				dropdownIndicator: state => styles.dropdown,
				option: state =>
					state.isFocused ? styles.optionFocused : styles.option,
			}}
		/>
	)
}
