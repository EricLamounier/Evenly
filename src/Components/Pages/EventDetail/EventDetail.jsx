import './EventDetail.css';
import img from '../../../Images/logo/evenly_logo.png';
import close from '../../../Images/icons/close.svg';

export default function EventDetail(props) {
  const event = props.event;
  const url = 'https://backend-sin143.000webhostapp.com/EventosImagens/';

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
          <h2>{event.evento_titulo}</h2>
          <h4>{event.evento_categoria}</h4>
          <h4>{event.evento_descricao}</h4>
          <p>{event.evento_local}</p>
          <p>{event.evento_data}</p>
          <p>{event.evento_hora}</p>
          <p>{event.evento_preco}</p>
        </div>

        <div className='eventComments'>
          <h3>Comentarios:</h3>
        </div>
      </div>
    </div>
  );
}
