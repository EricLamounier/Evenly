import './Home.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BoxPage from '../../BoxPage/BoxPage';
import NewEventButton from '../../NewEventButton/NewEventButton'
import { Cards } from '../../../Authentication/Cards';
import CardEvent from '../../CardEvent/CardEvent';
import EventDetail from '../EventDetail/EventDetail';

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [CurrentId, setId] = useState('');

  useEffect(() => {

    setId(localStorage.getItem('id'));

    //pega os dados do usuario autenticado
    Cards(CurrentId, 1, (response) => {
      const eventosArray = Object.values(response);
      setEventos(eventosArray);
    });
  }, []);


  const openModal = (evento) => {
    setSelectedEvent(evento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const teste = () => {
    console.log(eventos);
  }

  return (
    <BoxPage>
      {CurrentId}
      <button onClick={() =>{teste()}}>teste</button>
      <div className='main'>
        Lista de eventos
        <div className='events'>
          {eventos.map((evento) => (
            <CardEvent
              key={evento.evento_id}
              data={evento}
              titulo={evento.evento_titulo}
              imagem={evento.imagem_url}
              onOpenModal={() => openModal(evento)}
            />
          ))}
        </div>
        <NewEventButton />
        {isModalOpen && (
          <EventDetail event={selectedEvent} onCloseModal={closeModal} />
        )}
      </div>
    </BoxPage>
  );
}
