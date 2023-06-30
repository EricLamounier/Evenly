import './Home.css';
import { useEffect, useState } from 'react';
import BoxPage from '../../BoxPage/BoxPage';
import { Cards } from '../../../Authentication/Cards';
import CardEvent from '../../CardEvent/CardEvent';
import EventDetail from '../EventDetail/EventDetail';
import Loading from '../../Loading/Loading';

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    setLoading(<Loading/>);
    //pega os dados do usuario autenticado
    Cards(localStorage.getItem('id'), 1, (response) => {
      const eventosArray = Object.values(response);
      setEventos(eventosArray);
      setLoading('');
    });
  }, []);


  const openModal = (evento) => {
    setSelectedEvent(evento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BoxPage>
      <div className='main'>
        Lista de eventos
        <div className='events'>
          { loading ? 
            <Loading/>
          :
            eventos.map((evento) => (
              <CardEvent
                key={evento.evento_id}
                data={evento}
                titulo={evento.evento_titulo}
                imagem={evento.imagem_url}
                onOpenModal={() => openModal(evento)}
              />
            ))
          }
        </div>
        {isModalOpen && (
          <EventDetail event={selectedEvent} onCloseModal={closeModal} />
        )}
      </div>
    </BoxPage>
  );
}
