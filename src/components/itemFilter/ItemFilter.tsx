import { Field, Form, Formik } from 'formik';

import { useAppDispatch } from './../../hooks/useTyped';
import { fetchCharList, setFilter } from '../../redux/actions/characters';
import { FilterItems } from '../../types/characters';

import './itemFilter.scss';

const species = [
    { value: '', label: 'All' },
    { value: 'Human', label: 'Human' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Robot', label: 'Robot' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Disease', label: 'Disease' },
    { value: 'MythologicalCreature', label: 'Mythological Creature' },
    { value: 'Poopybutthole', label: 'Poopybutthole' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Unknown', label: 'Unknown' },
]

const ItemFilter = () => {
    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={{
                filter: '' as FilterItems
            }}
            onSubmit={({ filter }) => {
                dispatch(fetchCharList(1, filter));
                dispatch(setFilter(filter));
            }}>
            {({ values }) => (
                <Form className='item-filter'>
                    <Field
                        className='item-filter__select'
                        name="filter"
                        as="select"
                        type="text">
                        {
                            species.map(({ value, label }, i) => {
                                const isActive = values.filter === value;
                                const clazz = isActive ? 'active' : '';
                                return (
                                    <option
                                        className={`item-filter__option ${clazz}`}
                                        key={i}
                                        value={value}>
                                        {label}
                                    </option>
                                )
                            })
                        }
                    </Field>
                    <button className='button button__small' type='submit'>ok</button>
                </Form>
            )}
        </Formik>
    )
}

export default ItemFilter;