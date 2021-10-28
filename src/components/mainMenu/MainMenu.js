import { Link } from 'react-router-dom';
import './mainMenu.scss';

const MainMenu = () => {
    return (
        <div className='main-menu'>
            <Link to='/' className='main-menu__link' >Characters</Link>
            <Link to='/episodes' className='main-menu__link' >Episodes</Link>
            <Link to='/locations' className='main-menu__link' >Locations</Link>
        </div>
    )
}

export default MainMenu;