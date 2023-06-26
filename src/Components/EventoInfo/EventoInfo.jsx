import './EventoInfo.css';
import plus from '../../Images/icons/plus.svg';
import trash from '../../Images/icons/trash.svg';
import { useLocation } from 'react-router-dom';
import { excluirEvento } from '../../Authentication/Evento';
import { Link } from 'react-router-dom';

export default function EventoInfo(props) {

  const location = useLocation();

  const handleDelete = (evento_id) => {
    excluirEvento(evento_id, 2, (response) => {
      if (response === true) {
        props.onDeleteEvent();
      } else {
        alert('Falha na exclusão');
      }
    });
  };
  
  return (
    <div className='eventoInfo'>
      <img
        src={plus}
        className='plusInfo'
        alt='plus img'
        onClick={() => props.onOpenModal(props.data)}
      />

      {
        location.pathname === '/account' && (
          <img 
            src={trash}  
            className='trash' 
            alt="trash icon" 
            onClick={()=>{handleDelete(props.data.evento_id)}}
          />
        )
      }
      {
        location.pathname === '/account' && (
          <Link to={`/editarEvento?data=${encodeURIComponent(JSON.stringify(props.data))}`}>editar</Link>
          )
      }
    </div>
  );
}
