import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from "react-router-dom";

import "./mainMenu.scss";

const links = [
    { to: "/characters", label: "Characters" },
    { to: "/episodes", label: "Episodes" },
    { to: "/locations", label: "Locations" },
];

const MainMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch({ type: 'RESET_APP' });
    }, [location.pathname]);

    return (
        <div className="main-menu">
            {links.map(({ to, label }) => (
                <NavLink
                    key={to}
                    activeClassName="main-menu__link__active"
                    className="main-menu__link"
                    to={to}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
};

export default MainMenu;
