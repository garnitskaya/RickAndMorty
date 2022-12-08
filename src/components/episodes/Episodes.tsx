import { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchEpisodes } from "../../redux/actions/episodes";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { IEpisode } from "./../../types/episodes";
import { useAppDispatch, useAppSelector } from "../../hooks/useTyped";

import "./episodes.scss";

const Episodes = () => {
    const { episodes, loading, error, newItemLoading, offset, ended } = useAppSelector((state) => state.episodes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset?: number) => {
        dispatch(fetchEpisodes(offset!));
    };

    const renderItem = (arr: IEpisode[]) => {
        return arr.map(({ id, name, characters, airDate }) => {
            return (
                <div className="episodes__item" key={id}>
                    <Link to={`/episodes/${id}`} className="episodes__name">
                        Episode № {id} : {name}
                    </Link>
                    <span className="episodes__date">{airDate}</span>
                    <div className="episodes__img">{characters}</div>
                </div>
            );
        });
    };

    const episode = renderItem(episodes);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? episode : null;

    return (
        <div className="episodes">
            <h2 className="episodes__title">Episodes </h2>
            <div className="episodes__list">
                {spinner}
                {errorMessage}
                {content}
            </div>
            <button
                className="button__load button"
                disabled={newItemLoading}
                style={{ display: ended ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                load more
            </button>
        </div>
    );
};

export default Episodes;
