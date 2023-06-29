import './Account.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUid } from '../../../Firebase/Authentication';
import { pegaDadosUser } from '../../../Authentication/User';
import CardEvent from '../../CardEvent/CardEvent';
import { Cards } from '../../../Authentication/Cards';
import EventDetail from '../EventDetail/EventDetail';
import { excluirEvento } from '../../../Authentication/Evento';
import Loading from '../../Loading/Loading';
import Modal from '../../Modal/Modal';

export default function Account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [uid, setUid] = useState('');
  const [id, setId] = useState('');
  const [eventos, setEventos] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [fadeModal, setFadeModal] = useState('');


  useEffect(() => {
    const uid = getUid();
    pegaDadosUser(uid).then((data) => {
      setName(data[0].user_name);
      setEmail(data[0].user_email);
      setTipo(data[0].user_tipo);
      setUid(data[0].user_uid);
      setId(data[0].user_id);

      setLoading(true);

      Cards(data[0].user_id, 0, (response) => {
        const eventosArray = Object.values(response);
        setEventos(eventosArray);
        setLoading(false);
      });
    });
  }, []);

  const openModal = (evento) => {
    setSelectedEvent(evento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (evento_id) => {
    excluirEvento(evento_id, 2, (response) => {
      if (response === true) {
        deleteSucess();

        // Atualize a lista de eventos removendo o evento excluído
        setEventos(eventos.filter((evento) => evento.evento_id !== evento_id));
      } else {
        alert('Falha na exclusão');
      }
    });
  };

  function deleteSucess(){
    setModal(true);
    setTimeout(() => {
        setFadeModal('hide')
        setTimeout(() => {
            setFadeModal('')
            setModal(false);
        }, 1000)

    }, 3000);
}

  return (
    <BoxPage>
      <div className="account">
        <h2>Sua conta Evenly</h2>
        <div className='accountDetails'>
          <div>
          <p>Nome: {name}</p>
          <p>Email: {email}</p>
          <p>
            Tipo:{' '}
            {tipo === 0
              ? 'Participante'
              : tipo === 1
              ? 'Organizador'
              : tipo === 2
              ? 'Administrador'
              : false}
          </p>
          </div>

          <Link
            to={`/editarConta?&email=${email}&nome=${name}&tipoUsuario=${tipo}&id=${id}&uid=${uid}`}
          >
            <button className='editAccount'>Editar conta</button>
          </Link>
        </div>
        <hr />
        <h3>Seus eventos</h3>
        <div className="events">
          {loading ? (
            <Loading />
          ) : (
            eventos.map((evento) => (
              <CardEvent
                key={evento.evento_id}
                data={evento}
                titulo={evento.evento_titulo}
                imagem={evento.imagem_url}
                onOpenModal={() => openModal(evento)}
                onDeleteEvent={() => handleDeleteEvent(evento.evento_id)}
              />
            ))
          )}
        </div>
        {isModalOpen && (
          <EventDetail event={selectedEvent} onCloseModal={closeModal} />
        )}
      </div>
      {modal && (
       <Modal 
        className={`sucess ${fadeModal}`} 
        message="Evento excluído com sucesso!" />
      )}
    </BoxPage>
  );
}
