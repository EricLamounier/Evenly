import './NewEventButton.css';
import { Link } from 'react-router-dom';
import plus from '../../Images/icons/plus.svg';

export default function NewEventButton() {
    return (
        <div className='newButton'>
            <Link to="/criarEvento">
                <img src={plus} alt="add new event" />
                <button>Criar novo evento</button>
            </Link>
        </div>
    );
}