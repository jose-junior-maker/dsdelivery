import YoutubeIcon from '../../assets/img/youtube.svg?react';
import LinkedinIcon from '../../assets/img/linkedin.svg?react';
import InstagramIcon from '../../assets/img/instagram.svg?react';
import './styles.css'

export default function Footer(){
    return (
        <footer className='main-footer'>
            App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
            <div className='footer-icons'>
                <a href='https://www.youtube.com/@DevSuperior' target='_new'>
                    <YoutubeIcon />
                </a>
                <a href='https://linkedin.com/in/josejuniorrmaker' target='_new'>
                    <LinkedinIcon />
                </a>
                <a href='https://www.instagram.com/joseirivanjunior/'>
                    <InstagramIcon />
                </a>
            </div>
        </footer>
    );
}