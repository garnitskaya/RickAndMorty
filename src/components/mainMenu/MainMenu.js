import { NavLink } from 'react-router-dom';
import './mainMenu.scss';

const MainMenu = () => {
    return (
        <div className='main-menu'>
            <NavLink activeClassName="main-menu__link__active" to='/characters' className='main-menu__link' >Characters</NavLink>
            <NavLink activeClassName="main-menu__link__active" to='/episodes' className='main-menu__link' >Episodes</NavLink>
            <NavLink activeClassName="main-menu__link__active" to='/locations' className='main-menu__link' >Locations</NavLink>
        </div>
    )
}

export default MainMenu;