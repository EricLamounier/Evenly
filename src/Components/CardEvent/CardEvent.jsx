import './CardEvent.css';
import img from '../../Images/logo/evenly_logo.png';
import like from '../../Images/icons/like.svg';
import comment from '../../Images/icons/chat.svg';
import plus from '../../Images/icons/plus.svg';

export default function CardEvent(props) {
    const url = 'https://backend-sin143.000webhostapp.com/EventosImagens/'

    return (
        <div className="cardEvent">
            <div className='cardImgBox'>
                <img src={url + (props.imagem === null ? 'evenly_logo.png' : props.imagem)} className='cardImg' alt="loogo"/>
                <img src={plus} className='plusImg' alt="plus img"/>
            </div>
            <h3 className='cardTitle'>{props.titulo}</h3>
            <div className='box'>
                <img src={like} className='cardLike' alt='icon like'/>
                <img src={comment} className='cardComments' alt='icon comment' />
            </div>
        </div>
    );
}