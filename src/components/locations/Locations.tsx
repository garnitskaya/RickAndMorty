import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useTyped";

import { fetchLocations } from "../../redux/actions/locations";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { ILocation } from "./../../types/locations";

import "./locations.scss";

const Locations = () => {
    const { locations, loading, error, newItemLoading, ended, offset } = useAppSelector((state) => state.locations);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset?: number) => {
        dispatch(fetchLocations(offset!));
    };

    const renderItem = (arr: ILocation[]) => {
        return arr.map(({ id, name, type, dimension, residents }) => {
            return (
                <div className="locations__items" key={id}>
                    <div className="locations__item">
                        <span> name:</span>
                        <br />
                        <Link to={`/locations/${id}`} className="locations__name">
                            {name}
                        </Link>
                    </div>
                    <div className="locations__item">
                        <span> type:</span>
                        <br />
                        {type}
                    </div>
                    <div className="locations__item">
                        <span>dimension:</span>
                        <br />
                        {dimension}
                    </div>
                    <div className="locations__item">
                        <span>residents:</span>
                        <br />
                        <div className="locations__img">{residents}</div>
                    </div>
                </div>
            );
        });
    };

    const location = renderItem(locations);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? location : null;

    return (
        <div className="locations">
            <h2 className="locations__title">Locations</h2>
            <div className="locations__list">
                {spinner}
                {errorMessage}
                {content}
            </div>
            <button
                className="button button__load"
                disabled={newItemLoading}
                style={{ display: ended ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                load more
            </button>
        </div>
    );
};

export default Locations;
