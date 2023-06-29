import React, { useState } from 'react';
import './CriarEvento.css';
import BoxPage from '../../BoxPage/BoxPage';
import { pegaDadosUser } from '../../../Authentication/User';
import { getUid } from '../../../Firebase/Authentication';
import { inserirEvento, enviarImagem } from '../../../Authentication/Evento';
import Loading from '../../Loading/Loading';
import Modal from '../../Modal/Modal';

export default function CriarEvento() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('00-00-0000');
  const [hora, setHora] = useState('00:00');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState(0);
  const [image, setImage] = useState(null);
  const [local, setLocal] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState('');
  const [fadeModal, setFadeModal] = useState('');
 
  const handleSubmit = () => {
    const isFormValid = validateForm();
    setLoading(true);

    if (isFormValid) {
      const uid = getUid();
      pegaDadosUser(uid).then((response) => {
        console.log(response);
        inserirEvento(
          response[0].user_id,
          titulo,
          descricao,
          categoria,
          data,
          hora,
          preco,
          local,
          0,
          (el) => {
            if (image) {
              enviarImagem(image, el, 0);
            }
          }
        );
        alert('cadastrado com sucesso');
        setLoading(false);
      });
    } else {
      alert('Por favor, preencha todos os campos.');
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(preview);
    }
  };

  const validateForm = () => {
    return (
      titulo !== '' &&
      descricao !== '' &&
      data !== '' &&
      hora !== '' &&
      preco !== '' &&
      local !== ''
    );
  };

  return (
    <BoxPage className='criarEvento'>
      <h2 className='h2'>Criar novo evento</h2>

      <div className='inputBox titulo'>
        <label>Titulo do evento:</label>
        <input
          type='text'
          placeholder='Event'
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
          }}
          required
        />
      </div>

      <div className='inputBox descricao'>
        <label>Descrição do evento:</label>
        <textarea
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
          }}
          placeholder='Description'
          required
        ></textarea>
      </div>

      <div className='inputBox data'>
        <label>Data do evento:</label>
        <input
          type='date'
          onChange={(e) => {
            setData(e.target.value);
          }}
          required
        />
      </div>

      <div className='inputBox hora'>
        <label>Hora do evento:</label>
        <input
          type='time'
          value={hora}
          onChange={(e) => {
            setHora(e.target.value);
          }}
          placeholder='00:00'
          required
        />
      </div>

      <div className='inputBox categoria'>
        <label>Categoria</label>
        <select
          name='categoria'
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
          }}
        >
          <option value='0'>Festa</option>
          <option value='1'>Bar</option>
          <option value='2'>Show</option>
          <option value='3'>Musica ao vivo</option>
          <option value='4'>Teatro</option>
          <option value='5'>Curso</option>
          <option value='6'>Feira</option>
        </select>
      </div>

      <div className='inputBox preco'>
        <label>Preço do evento:</label>
        <input
          type='text'
          value={preco}
          onChange={(e) => {
            setPreco(e.target.value);
          }}
          placeholder='0,00'
          required
        />
      </div>

      <div className='inputBox loc'>
        <label>Local do evento:</label>
        <input
          type='text'
          value={local}
          onChange={(e) => {
            setLocal(e.target.value);
          }}
          placeholder='Location'
          required
        />
      </div>

      <div className='inputBox img'>
        <label>Imagem do evento:</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          required
        />
      </div>

      {imagePreview && (
        <div className='imagePreviewContainer img'>
          <img src={imagePreview} alt='Preview' className='imagePreview' />
        </div>
      )}

      <button className='bttn' onClick={handleSubmit}>
        {loading ? <Loading/> : 'Criar evento'}
      </button>
      {modal && (
        <Modal 
            className={`sucess ${fadeModal}`} 
            message='Evento criado com sucesso' />
        )}
    </BoxPage>
  );
}
