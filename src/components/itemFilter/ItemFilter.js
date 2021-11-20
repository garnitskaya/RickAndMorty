import { useState } from 'react';
import './itemFilter.scss';

const ItemFilter = (props) => {
    const [value, setValue] = useState('all');

    const species = [
        { value: 'all', label: 'All' },
        { value: 'human', label: 'Human' },
        { value: 'alien', label: 'Alien' },
        { value: 'humanoid', label: 'Humanoid' },
        { value: 'robot', label: 'Robot' },
        { value: 'animal', label: 'Animal' },
        { value: 'disease', label: 'Disease' },
        { value: 'mythologicalCreature', label: 'Mythological Creature' },
        { value: 'poopybutthole', label: 'Poopybutthole' },
        { value: 'cronenberg', label: 'Cronenberg' },
        { value: 'unknown', label: 'Unknown' },
    ]

    const onChangeSelect = (e) => {
        setValue(e.target.value);
        props.onFilterChange(e.target.value)
    }

    const { filter } = props;

    return (
        <select
            value={value}
            onChange={onChangeSelect}
            className='item-filter'  >
            {
                species.map(({ value, label }) => {
                    const isActive = filter === value;
                    const clazz = isActive ? 'active' : null;
                    return (
                        <option
                            className={`item-filter__option ${clazz}`}
                            key={value}
                            value={value}>
                            {label}
                        </option>
                    )
                })
            }
        </select >
    )
}

export default ItemFilter;