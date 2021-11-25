import './singleEpisodeLayout.scss';


const SingleEpisodeLayout = ({ data, goBack, nextData }) => {
    const { id, name, characters, airDate } = data;

    return (
        <div className='single-episode'>
            <div className='single-episode__item' key={id}>
                <h2 className='single-episode__name'>Episode № {id} : {name}</h2>
                <span className='single-episode__date'>{airDate}</span>
                <div className='single-episode__img'>  {characters}</div>
            </div>

            <div className='single-episode__buttons'>
                <button
                    type='button'
                    className='single-episode__back'
                    onClick={goBack}>
                    <i className="fas fa-chevron-left"></i>
                    back
                </button>
                <button
                    type='button'
                    className='single-episode__next'
                    onClick={nextData}>
                    Next
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    )
}

export default SingleEpisodeLayout;