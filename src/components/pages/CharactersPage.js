import ErrorBoundary from './../errorBoundary/ErrorBoundary';
import RandomChar from './../randomChar/RandomChar';
import CharList from './../charList/CharList';
import SearchPanel from './../searchPanel/SearchPanel';
import ItemFilter from './../itemFilter/ItemFilter';
import { useState } from 'react';

const CharactersPage = () => {
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const searchItem = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }

    const filterItem = (charList, filter) => {
        switch (filter) {
            case "human":
                return charList.filter(item => item.species === 'Human');
            case "alien":
                return charList.filter(item => item.species === 'Alien');
            case "humanoid":
                return charList.filter(item => item.species === 'Humanoid');
            case "robot":
                return charList.filter(item => item.species === 'Robot');
            case "animal":
                return charList.filter(item => item.species === 'Animal');
            case "disease":
                return charList.filter(item => item.species === 'Disease');
            case "mythologicalCreature":
                return charList.filter(item => item.species === 'Mythological Creature');
            case "poopybutthole":
                return charList.filter(item => item.species === 'Poopybutthole');
            case "cronenberg":
                return charList.filter(item => item.species === 'Cronenberg');
            case "unknown":
                return charList.filter(item => item.species === 'unknown');
            default:
                return charList;
        }
    }

    const onFilterChange = (filter) => {
        setFilter(filter);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className='char__select'>
                <SearchPanel onUpdateSearch={onUpdateSearch} />
                <ItemFilter
                    onFilterChange={onFilterChange}
                    filter={filter} />
            </div>
            <ErrorBoundary>
                <CharList
                    filterItem={filterItem}
                    searchItem={searchItem}
                    term={term}
                    filter={filter} />
            </ErrorBoundary>
        </>)
}

export default CharactersPage;