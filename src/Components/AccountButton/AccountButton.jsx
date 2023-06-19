import './AccountButton.css';
import engrenagem from '../../Images/icons/engrenagem.svg';
export default function AccountButton(props) {
    return (
        <div className='accountButton'>
            <div className='imgBox'>
                <img className='perfil' src={props.img} alt="user perfil" />
                <img className='gear' src={engrenagem} alt="gear icon"/>
            </div>
        </div>
    );
}