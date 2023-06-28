import './EventDetail.css';
import close from '../../../Images/icons/close.svg';
import send from '../../../Images/icons/send.svg';
import CommentBox from '../../CommentBox/CommentBox';
import { useState, useEffect } from 'react';
import { comentar } from '../../../Authentication/Evento';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../Loading/Loading';
import Modal from '../../Modal/Modal';

export default function EventDetail(props) {
  const event = props.event;
  const url = 'https://backend-sin143.000webhostapp.com/EventosImagens/';
  const [comment, setComment] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [modal, setModal] = useState(false);
  const [fadeModal, setFadeModal] = useState('');
  const [inscriptionStatus, setInscriptionStatus] = useState(false);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    getInscription();
    setLoading(true);
    comentar(5, event.evento_id, -1, '', (response) => {
      setData(response);
      setLoading(false);
    });
  }, []);

  const sendComment = () => {
    const currentId = localStorage.getItem('id');
    const eventId = event.evento_id;

    const newComment = {
      user_name: localStorage.getItem('user_name'),
      evento_comentario: comment
    };

    comentar(4, eventId, currentId, comment, (response) => {
      if (response.response) {
        setData((prevData) => [...prevData, newComment]);
        setComment('');
      }
    });
  };

  const sendInscription = () => {
    const eventId = event.evento_id;
    const currentId = localStorage.getItem('id');

    if (inscriptionStatus) {
      // Usuário já está inscrito, exibir alerta ou mensagem de erro
      alert('Você já está inscrito neste evento.');
      return;
    }

    comentar(6, eventId, currentId, '', (response) => {
      setButtonText('Inscrito!');
      setInscriptionStatus(true);
      chamaModal();
    });
  };

  function chamaModal() {
    setModal(true);
    setTimeout(() => {
      setFadeModal('hide');
      setTimeout(() => {
        setFadeModal('');
        setModal(false);
      }, 1000);
    }, 3000);
  }

  function getInscription() {
    const eventId = event.evento_id;
    const currentId = localStorage.getItem('id');

    comentar(7, eventId, currentId, '', (response) => {
      setInscriptionStatus(response.inscription);
      setButtonText(response.inscription ? 'Inscrito!' : `Se inscrever R$ ${event.evento_preco}`);
  
    });
  }

  return (
    <div className="eventDetail">
      <div className="leftContent">
        <img
          className="eventImg"
          src={url + (event.imagem_url === null ? 'evenly_logo.png' : event.imagem_url)}
          alt="teste"
        />
        <button className={`inscrever ${inscriptionStatus ? 'checked' : ''}`} onClick={sendInscription} disabled={inscriptionStatus}>
          {buttonText}
        </button>
      </div>
      <div className="eventContent">
        <div className="eventInfo">
          <div className="closeBox">
            <img
              className="close"
              src={close}
              title="fechar"
              alt="close button"
              onClick={props.onCloseModal}
            />
          </div>
          <h1>{event.evento_titulo}</h1>
          <p>Categoria: {event.evento_categoria}</p>
          <p>{event.evento_descricao}</p>
          <p>Local: {event.evento_local}</p>
          <div className="date">
            <p>Dia: {event.evento_data}</p>
            <p>às</p>
            <p>{event.evento_hora}</p>
          </div>
          <p>Valor: R$ {event.evento_preco}</p>
        </div>

        <div className="eventComments">
          <div className="commentBoxContainer">
            {loading ? (
              <Loading />
            ) : (
              data.map((ev) => (
                <CommentBox key={uuidv4()} user={ev.user_name} comment={ev.evento_comentario} />
              ))
            )}
          </div>
          <div className="inputbox">
            <input
              type="text"
              className="comment"
              placeholder="Comente aqui..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="iconBox">
              <img
                src={send}
                className="sendIcon"
                alt="send icon"
                title="send"
                onClick={() => sendComment()}
              />
            </div>
          </div>
        </div>
      </div>
      {modal && <Modal className={`sucess ${fadeModal}`} message="Inscrição confirmada!" />}
    </div>
  );
}
