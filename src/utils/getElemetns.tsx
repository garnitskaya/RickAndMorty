import { Link } from "react-router-dom";

export const getElements = (element: string[]): JSX.Element => {
  return element.map((item, i) => {
    const regexp: RegExp | null = /\/([0-9]*)$/;
    let id = item.match(regexp);

    return (
      <Link to={`/characters/${id?.[1]}`} key={i}>
        <img
          src={`https://rickandmortyapi.com/api/character/avatar/${id?.[1]}.jpeg`}
          alt={`character  ${id}`}
        />
      </Link>
    );
  }) as unknown as JSX.Element;

};
