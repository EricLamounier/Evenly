import './CardEvent.css';
import like from '../../Images/icons/like.svg';
import liked from '../../Images/icons/like-fill.svg';
import comment from '../../Images/icons/chat.svg';
import EventoInfo from '../EventoInfo/EventoInfo';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { curtir } from '../../Authentication/Evento';

export default function CardEvent(props) {
  const url = 'https://backend-sin143.000webhostapp.com/EventosImagens/';

  const [isLiked, setIsLiked] = useState(false);
  const [img, setImg] = useState(like);
  const [countLike, setCountLike] = useState('');
  const [countComment, setCountComment] = useState('');
  const [userCard, setUserCard] = useState('');

  const location = useLocation();
  useEffect(() => {

    setUserCard(props.data.user_name);
    //pega a quantidade de curtidas e comentários de cada evento
    curtir(2, props.data.evento_id, -1, (response) => {
      setCountLike(response.curtidas);
      setCountComment(response.comentarios);
    });

    //verifica se o usuário atual já curtiu o evento
    curtir(3, props.data.evento_id, localStorage.getItem('id'), (response) => {
      setIsLiked(response.isLiked);
      response.isLiked === 1 ? setImg(liked) : setImg(like);
    });
  }, [props.data.evento_id]);

  const handleLike = () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      //curtiu
      curtir(0, props.data.evento_id, localStorage.getItem('id'), (response) => {
        //liked
      });
      setCountLike(countLike + 1);
      setImg(liked);
    } else {
      //descurtiu
      curtir(1, props.data.evento_id, localStorage.getItem('id'), (response) => {
        //unliked
      });
      setCountLike(countLike - 1);
      setImg(like);
    }
  };

  return (
    <div className="cardEvent">
      <p className="username">{userCard}</p>
      <div className="cardImgBox">
        <img
          src={url + (props.imagem === null ? 'evenly_logo.png' : props.imagem)}
          className="cardImg"
          alt="loogo"
        />
        <EventoInfo data={props.data} onOpenModal={props.onOpenModal} onDeleteEvent={props.onDeleteEvent} />
      </div>
      <h3 className="cardTitle">{props.titulo}</h3>
      <div className="box">
        <div className="likeBox">
          <img
            src={img}
            className="cardLike"
            alt="icon like"
            onClick={() => {
              handleLike();
            }}
          />
          <span>{countLike}</span>
        </div>
        {
          location.pathname === '/account' && (
            <Link className='editEvent' to={`/editarEvento?data=${encodeURIComponent(JSON.stringify(props.data))}`}>editar</Link>
            )
        }
        <div className="likeBox">
          <span>{countComment}</span>
          <img
            src={comment}
            className="cardComments"
            alt="icon comment"
            onClick={() => props.onOpenModal(props.data)}
          />
        </div>
      </div>
    </div>
  );
}