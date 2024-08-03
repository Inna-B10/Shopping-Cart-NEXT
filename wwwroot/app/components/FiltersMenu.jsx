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

export default function FiltersMenu() {
	const options = [
		{ value: 'gold', label: 'Gold' },
		{ value: 'silver', label: 'Silver' },
		{ value: 'whiteGold', label: 'White gold' },
		{ value: 'goldPlated_silver', label: 'Gold-plated silver' },
		{ value: 'titanium', label: 'Titanium' },
		{ value: 'stone', label: 'With stone' },
		{ value: 'noStone', label: 'Without stone' },
	]

	return (
		<Select
			name='filters'
			closeMenuOnSelect={false}
			components={customComponents}
			defaultValue={[options[0]]}
			isClearable={false}
			isSearchable={false}
			placeholder='Select filter(s)'
			isMulti
			options={options}
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
			// 	option: (base, state) => ({
			// 		...base,
			// 		backgroundColor: state.isSelected ? 'blue' : 'white',
			// 		color: state.isSelected ? 'white' : 'black',
			// 	}),
		/>
	)
}
