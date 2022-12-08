import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { SinglePageProps } from "../../types";
import { useAppDispatch, useAppSelector } from "./../../hooks/useTyped";
import { fetchCharacter, fetchEpisode, fetchLocation } from "../../redux/actions/character";

type SingleProps = {
  Component: React.LazyExoticComponent<React.FC<SinglePageProps<any>>>;
  dataType: string;
}

const SinglePage: React.FC<SingleProps> = ({ Component, dataType }) => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const next = Number(id) + 1;

  const { data, loading, error } = useAppSelector((state) => state.character);
  const dispatch = useAppDispatch();

  useEffect(() => {
    updateData();
  }, [id]);

  const nextData = () => {
    switch (dataType) {
      case "character":
        return history.push(`/characters/${next}`);
      case "location":
        return history.push(`/locations/${next}`);
      case "episode":
        return history.push(`/episodes/${next}`);
      default:
        break;
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const updateData = () => {
    switch (dataType) {
      case "character":
        return dispatch(fetchCharacter(Number(id)));
      case "location":
        return dispatch(fetchLocation(Number(id)));
      case "episode":
        return dispatch(fetchEpisode(Number(id)));
      default:
        break;
    }
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(spinner || error || !data) ? (
    <Component
      data={data}
      goBack={goBack}
      nextData={nextData} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
