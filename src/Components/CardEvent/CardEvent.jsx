import './CardEvent.css';
import like from '../../Images/icons/like.svg';
import liked from '../../Images/icons/like-fill.svg';
import comment from '../../Images/icons/chat.svg';
import EventoInfo from '../EventoInfo/EventoInfo';
import { useState, useEffect } from 'react';

import { curtir } from '../../Authentication/Evento';

export default function CardEvent(props) {

    const url = 'https://backend-sin143.000webhostapp.com/EventosImagens/';

    const [isLiked, setIsLiked] = useState(false);
    const [img, setImg] = useState(like);
    const [countLike, setCountLike] = useState(2);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {

        setCurrentId(localStorage.getItem('id'));
        
        isLiked === true ? setImg(liked) : setImg(like);
        setCountLike(props.data.evento_curtidas);
    }, []);
    
    const handleLike = () => {
        console.log(props.data);

        console.log(props.data.currentUser);
        setIsLiked(!isLiked);

        if(!isLiked){ //curtiu
            curtir(0, props.data.evento_id, currentId, (response) => {
                setImg(liked);
            });
        }else{ //descurtiu
            curtir(1, props.data.evento_id, currentId, (response) => {
                setImg(like);
            });
        }
    }

    return (
        <div className="cardEvent">
            <div className='cardImgBox'>
                <img src={url + (props.imagem === null ? 'evenly_logo.png' : props.imagem)} className='cardImg' alt="loogo"/>
                <EventoInfo data={props.data} onOpenModal={props.onOpenModal} onDeleteEvent={props.onDeleteEvent} />
            </div>
            <h3 className='cardTitle'>{props.titulo}</h3>
            <div className='box'>
                <div>
                    <img 
                        src={img} 
                        className='cardLike' 
                        alt='icon like'
                        onClick={()=>{handleLike()}}
                    />
                    <span>{countLike}</span>
                </div>
                <img src={comment} className='cardComments' alt='icon comment' />
            </div>
        </div>
    );
}
