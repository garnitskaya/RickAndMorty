import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';

import { setTerm } from '../../redux/actions/characters';

import './searchPanel.scss';

const SearchPanel = () => {
    const { term } = useAppSelector(state => state.characters);
    const dispatch = useAppDispatch();

    return (
        <div className='search-panel'>
            <input
                className='search-panel__input'
                placeholder='Type a character`s name'
                type='text'
                value={term}
                onChange={(e) => dispatch(setTerm(e.target.value))} />
            <i className="search fas fa-search"></i>
        </div>
    )
}

export default SearchPanel;