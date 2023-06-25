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
    const [countLike, setCountLike] = useState('');
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {

        setCurrentId(localStorage.getItem('id'));
        
        //pega a quantidade de curtidas de cada evento
        curtir(2, props.data.evento_id, -1, (response)=>{
            setCountLike(response.curtidas);
        });

        //verifica quais eventos o usuario atual ja curtiu
        curtir(3, props.data.evento_id, localStorage.getItem('id'), (response)=>{
            setIsLiked(response.isLiked);
            response.isLiked === 1 ? setImg(liked) : setImg(like);
        });

    }, []);
    
    const handleLike = () => {

        setIsLiked(!isLiked);

        if(!isLiked){ //curtiu
            curtir(0, props.data.evento_id, currentId, (response) => {
                //liked
            });
            setCountLike(countLike+1);
            setImg(liked)
        }else{ //descurtiu
            curtir(1, props.data.evento_id, currentId, (response) => {
                //unliked
            });
            setCountLike(countLike-1);
            setImg(like);
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
                <div className='likeBox'>
                    <img 
                        src={img} 
                        className='cardLike' 
                        alt='icon like'
                        onClick={()=>{handleLike()}}
                    />
                    <span>{countLike}</span>
                </div>
                <img 
                    src={comment} 
                    className='cardComments' 
                    alt='icon comment'
                    onClick={() => props.onOpenModal(props.data)}
                />
            </div>
        </div>
    );
}
