import { SinglePageProps } from '../../../types';
import { ILocation } from '../../../types/locations';

import './singleLocationLayout.scss';

const SingleLocationLayout: React.FC<SinglePageProps<ILocation>> = ({ data, goBack, nextData }) => {
    const { name, type, dimension, residents } = data;

    return (
        <div className='single-location'>
            <div className='single-location__items'>
                <div className='single-location__item'>
                    <span> name:</span>
                    <br />
                    {name}
                </div>
                <div className='single-location__item'>
                    <span> type:</span>
                    <br />
                    {type}
                </div>
                <div className='single-location__item'>
                    <span>dimension:</span>
                    <br />
                    {dimension}
                </div>
                <div className='single-location__item'>
                    <span>residents:</span>
                    <br />
                    <div className='single-location__img'>{residents}</div>
                </div>
            </div>
            <div className='single-location__buttons'>
                <button
                    type='button'
                    className='single-location__back'
                    onClick={goBack}>
                    <i className="fas fa-chevron-left"></i>
                    back
                </button>
                <button
                    type='button'
                    className='single-location__next'
                    onClick={nextData}>
                    Next
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    )
}

export default SingleLocationLayout;