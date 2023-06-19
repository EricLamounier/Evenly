import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoHeader from '../../Images/logo/evenly_row.png'

import AccountButton from '../AccountButton/AccountButton';
export default function Header(props) {

    const location = useLocation();

    return (
        
        <header className="header">
            <div className="logo">
                <Link to="/home" ><img src={logoHeader} alt="logo evenly" title="Evenly especialmente para você!" /></Link>
            </div>
            <div className="info">
                {
                props.el === 1 ? (
                <>
                    <Link to="/account">
                        <AccountButton img={props.photoPerfil} />
                    </Link>
                </>
                 
                 ): 
                 (
                    <div className='links'>
                        <Link className={`link ${location.pathname === '/about' ? 'active' : ''}`} to="/about"><p>Sobre nós</p></Link>
                        <Link className={`link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact"><p>Fale conosco</p></Link>
                        <Link className={`link ${location.pathname === '/licence' ? 'active' : ''}`} to="/licence"><p>Licença</p></Link>
                    </div>
                 )}
            </div>
        </header>
    )
}