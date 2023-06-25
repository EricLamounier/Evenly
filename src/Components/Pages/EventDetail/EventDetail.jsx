import './EventDetail.css';
import close from '../../../Images/icons/close.svg';
import send from '../../../Images/icons/send.svg';
import CommentBox from '../../CommentBox/CommentBox';
import { useState, useEffect } from 'react';
import { comentar } from '../../../Authentication/Evento'

export default function EventDetail(props) {
  const event = props.event;
  const url = 'https://backend-sin143.000webhostapp.com/EventosImagens/';
  const [comment, setComment] = useState('');
  const [data, setData] = useState([]);

  useEffect(()=>{
    comentar(5, event.evento_id, -1, '', (response)=>{
      //console.log( response)
      setData(response)
    })
  }, [])

  const sendComment = () => {
    const currentId = localStorage.getItem('id');
    const eventId = event.evento_id;

    comentar(4, eventId, currentId, comment, (response)=>{
      if(response.response){
        const newComment = {
          user_name: 'Nome do Usuário',
          evento_comentario: comment
        };
        setData((prevData) => [...prevData, newComment]);
      }
    })
  }

  return (
    <div className='eventDetail'>
      <img className='eventImg' src={url + (event.imagem_url === null ? 'evenly_logo.png' : event.imagem_url) } alt='teste' />
      <div className='eventContent'>
        <div className='eventInfo'>
          <div className='closeBox'>
            <img
              className='close'
              src={close}
              title='fechar'
              alt='close button'
              onClick={props.onCloseModal}
            />
          </div>
          <h1>{event.evento_titulo}</h1>
          <p>Categoria: {event.evento_categoria}</p>
          <p>{event.evento_descricao}</p>
          <p>Local: {event.evento_local}</p>
          <div className='date'>
            <p>Dia: {event.evento_data}</p>
            <p>às</p>
            <p>{event.evento_hora}</p>
          </div>
          <p>Valor: R$ {event.evento_preco}</p>
        </div>

        <div className='eventComments'>
        <div className='commentBoxContainer'>
          {
            data.map(ev => (
              <CommentBox
                user={ev.user_name}
                comment={ev.evento_comentario}
              />
            ))
          }
        </div>
        <div className='inputbox'>
          <input 
            type='text' 
            className='comment' 
            placeholder='Comente aqui...'
            onChange={(e)=>setComment(e.target.value)}
          />
          <div className='iconBox'>
            <img 
              src={send} 
              className='sendIcon' 
              alt="send icon" 
              title="send"
              onClick={()=>sendComment()}
            />
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
