import './mainMenu.scss';

const MainMenu = () => {
    return (
        <div className='main-menu'>
            <a className='main-menu__link' href="#s">Characters</a>
            <a className='main-menu__link' href="#s">Episodes</a>
            <a className='main-menu__link' href="#s">Locations</a>
        </div>
    )
}

export default MainMenu;