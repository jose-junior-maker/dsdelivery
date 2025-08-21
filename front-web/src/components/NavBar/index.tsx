import './styles.css';
import Logo from '../../assets/img/logo.svg?react';

export default function NavBar(){
    return (
        <nav className="main-navbar">
            <Logo />
            <a href="home" className='logo-text'>DS Delivery</a>
        </nav>
    );
}