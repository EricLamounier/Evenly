import './NewEventButton.css';
import { Link } from 'react-router-dom';
import plus from '../../Images/icons/plus.svg';

export default function NewEventButton() {
  return (
    <div className='newButton'>
      <Link to="/criarEvento" className='boxNewEvent'>
        <img src={plus} alt="add new event" />
        <p>Adicionar Evento</p>
      </Link>
    </div>
  );
}
