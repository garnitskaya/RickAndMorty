import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import SearchPanel from "../searchPanel/SearchPanel";
import ItemFilter from "../itemFilter/ItemFilter";
import { fetchCharList } from "../../redux/actions/characters";
import { useAppSelector, useAppDispatch } from "../../hooks/useTyped";
import { FilterItems } from "../../types/characters";
import { CharType } from "../../types/character";

import "./charList.scss";

const CharList = () => {
  const [selectedChar, setSelectedChar] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const {
    filteredItems,
    loading,
    error,
    offset,
    filter,
    term,
    newItemLoading,
    charEnded,
  } = useAppSelector((state) => state.characters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onRequest(offset, filter as FilterItems);
  }, []);

  const onRequest = (offset: number, filter: FilterItems) => {
    dispatch(fetchCharList(offset, filter));
  };

  const onShowInfo = (id: number) => {
    setSelectedChar(id);
    setShowInfo((showInfo) => !showInfo);
  };

  const renderItems = (arr: CharType[]) => {
    const items = arr.map(
      ({ id, name, image, status, locationName, episode, species, gender }) => {
        let statusClassName;
        switch (status) {
          case "Dead":
            statusClassName = "dead fa-skull-crossbones";
            break;
          case "Alive":
            statusClassName = "alive heartbeat fa-heartbeat";
            break;
          default:
            statusClassName = "unknown fa-question";
        }

        let speciesClassName;
        switch (species) {
          case "Human":
            speciesClassName = "fas fa-male";
            break;
          case "Alien":
            speciesClassName = "fab fa-reddit-alien";
            break;
          case "Humanoid":
            speciesClassName = "fas fa-pastafarianism";
            break;
          case "Robot":
            speciesClassName = "fas fa-robot";
            break;
          case "Animal":
            speciesClassName = "fas fa-paw";
            break;
          case "Disease":
            speciesClassName = "fas fa-disease";
            break;
          case "Mythological Creature":
            speciesClassName = "fas fa-spider";
            break;
          case "Poopybutthole":
            speciesClassName = "fab fa-snapchat-ghost";
            break;
          case "Cronenberg":
            speciesClassName = "fas fa-bug";
            break;
          default:
            speciesClassName = "unknown fas fa-question";
        }

        const active = selectedChar === id && showInfo ? "active" : "";

        return (
          <li className="char__card" key={id}>
            <button className="char__descr" onClick={() => onShowInfo(id)}>
              <i className="descr far fa-eye"></i>
            </button>
            <img className="char__img" src={image} alt={name} />
            <div className="char__block char-item">
              <Link to={`/characters/${id}`} className="char-item__name">
                {name.length > 15 ? `${name.slice(0, 14)}...` : name}
              </Link>
              <div className="char-item__block">
                <div className="char-item__species">
                  Species
                  <i className={`${speciesClassName}`} />
                  {species}
                </div>
                <div className="char-item__status">
                  Status
                  <i className={`fas ${statusClassName}`} />
                  {status}
                </div>
              </div>
              <div className={`char-item__blocks ${active}`}>
                <div className="char-item__label">
                  Gender:
                  <br />
                  <span>{gender}</span>
                </div>
                <div className="char-item__label">
                  Location:
                  <br />
                  <span>{locationName}</span>
                </div>
                <div className="char-item__label">
                  First seen in :
                  <br />
                  <span>Episodes № {episode}</span>
                </div>
              </div>
            </div>
          </li>
        );
      }
    );

    const allCharList = items.length;

    return (
      <>
        <div className="char__count">results : {allCharList}</div>
        <ul className="char__flex">{items}</ul>
      </>
    );
  };

  const searchItem = (items: CharType[], term: string): CharType[] => {
    if (term.length === 0) return items;

    return items.filter(
      (item) => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  const items = renderItems(searchItem(filteredItems, term));

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading || newItemLoading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      <div className="char__select">
        <SearchPanel />
        <ItemFilter />
      </div>
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__load"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset, filter as FilterItems)}
      >
        load more
      </button>
    </div>
  );
};

export default CharList;
