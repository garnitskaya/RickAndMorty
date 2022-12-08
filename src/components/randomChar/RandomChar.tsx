import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchCharacter } from '../../redux/actions/character';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/useTyped';
import { CharType } from '../../types/character';

import './randomChar.scss';

const RandomChar = () => {
  const { data, loading, error } = useAppSelector(state => state.character);
  const dispatch = useAppDispatch();

  useEffect(() => {
    updateChar();
    const timeId = setInterval(updateChar, 100000);

    return () => clearInterval(timeId);
  }, []);

  const updateChar = () => {
    const id = Math.floor(Math.random() * (670 - 1) + 1);
    dispatch(fetchCharacter(id));
  }

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? <View data={data as CharType} /> : null;

  return (
    <div className='randomchar'>

      {spinner}
      {errorMessage}
      {content}

      <button
        className='button button__random'
        onClick={updateChar}>
        try it
      </button>
    </div>
  )
}

type ViewType = {
  data: CharType;
}

const View: React.FC<ViewType> = ({ data }) => {
  const { id, name, image } = data;
  return (
    <div className='randomchar__card'>
      <img src={image} alt={name} />
      <Link to={`/characters/${id}`} className='randomchar__name' >
        <h2>{name}</h2>
      </Link>
    </div>
  )
}
export default RandomChar;
