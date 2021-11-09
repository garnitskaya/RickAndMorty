import { NavLink } from 'react-router-dom';
import './mainMenu.scss';

const MainMenu = () => {
    return (
        <div className='main-menu'>
            <NavLink exact activeClassName="main-menu__link__active" to='/' className='main-menu__link' >Characters</NavLink>
            <NavLink exact activeClassName="main-menu__link__active" to='/episodes' className='main-menu__link' >Episodes</NavLink>
            <NavLink exact activeClassName="main-menu__link__active" to='/locations' className='main-menu__link' >Locations</NavLink>
        </div>
    )
}

export default MainMenu;