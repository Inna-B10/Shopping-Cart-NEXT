'use client'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from './SelectMenu.module.css'

const animatedComponents = makeAnimated()

export default function SelectMenu() {
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
			components={animatedComponents}
			defaultValue={[options[0]]}
			isClearable={true}
			isSearchable={false}
			placeholder='Select filter(s)'
			// styles={{ container: base => ({ ...base, marginBottom: 76 }) }}
			isMulti
			options={options}
			//unstyled
			classNamePrefix='react-select'
			className={styles.filtersContainer}
			classNames={{
				control: state =>
					state.isFocused
						? state.menuIsOpen
							? styles.menuOpen
							: styles.controlFocused
						: styles.control,
				menu: state => styles.menu,
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
			// styles={{
			// 	// control: (base, state) => ({
			// 	// 	...base,
			// 	// 	borderColor: state.isFocused ? 'red' : 'blue',
			// 	// }),
			// 	option: (base, state) => ({
			// 		...base,
			// 		backgroundColor: state.isSelected ? 'blue' : 'white',
			// 		color: state.isSelected ? 'white' : 'black',
			// 	}),
			// 	multiValue: base => ({
			// 		...base,
			// 		backgroundColor: 'lightgrey',
			// 		color: 'black',
			// 	}),
			// 	menu: base => ({
			// 		...base,
			// 		backgroundColor: 'lightyellow',
			// 	}),
			// }}
		/>
	)
}
