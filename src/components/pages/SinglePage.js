import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';


const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const history = useHistory();
    const next = Number(id) + 1;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const rickAndMortyService = new RickAndMortyService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [id]);

    const nextData = () => {
        switch (dataType) {
            case 'character':
                return history.push(`/characters/${next}`);
            case 'location':
                return history.push(`/locations/${next}`);
            case 'episode':
                return history.push(`/episodes/${next}`);
            default:
                break;
        }
    }

    const goBack = () => {
        history.goBack();
    };

    const updateData = () => {
        onDataLoading();

        switch (dataType) {
            case 'character':
                return rickAndMortyService
                    .getCharacter(id)
                    .then(onDataLoaded)
                    .catch(onError)
            case 'location':
                return rickAndMortyService
                    .getLocation(id)
                    .then(onDataLoaded)
                    .catch(onError)
            case 'episode':
                return rickAndMortyService
                    .getEpisode(id)
                    .then(onDataLoaded)
                    .catch(onError)
            default:
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(() => data);
        setLoading(false);
    }

    const onDataLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} goBack={goBack} nextData={nextData} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;