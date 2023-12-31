import './EditEvent.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { atualizarEvento, retornaCategoria } from '../../../Authentication/Evento';
import Loading from '../../Loading/Loading';
import Modal from '../../Modal/Modal';

export default function CriarEvento() {

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('2023-03-23');
    const [hora, setHora] = useState('00:00');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [local, setLocal] = useState('');
    const [catId, setCadId] = useState('');
    const [modal, setModal] = useState(false);
    const [fadeModal, setFadeModal] = useState('');
    const location = useLocation();
    const [loading, setLoading] = useState('Atualizar evento');

    // Obtém o valor do parâmetro "data" da URL
    const queryParams = new URLSearchParams(location.search);
    const dataParam = queryParams.get('data');

    // Converte a string de volta para um objeto
    const event = JSON.parse(decodeURIComponent(dataParam));

    useEffect(()=>{

        setTitulo(event.evento_titulo);
        setDescricao(event.evento_descricao);
        setData(event.evento_data);
        setHora(event.evento_hora);
        setLocal(event.evento_local);
        setPreco(event.evento_preco);
        
        setCategoria(event.evento_categoria)

        setCadId(retornaCategoria(event.evento_categoria));

    },[])

    const handleSubmit = () =>{
        setLoading(<Loading/>)
        atualizarEvento(event.evento_id, titulo, descricao, categoria, data, hora, preco, local, 3, response =>{
            editadoSucesso();
            setLoading('Atualizar evento');
        })
    }

    function editadoSucesso(){
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
        <BoxPage className='updateEvent'>
            <h2 className='h2'>Atualizar evento</h2>

            <div className='inputBox titulo'>
                <label>Titulo do evento:</label>
                <input 
                    type='text' 
                    placeholder='Event' 
                    value={titulo}
                    onChange={(e)=>{setTitulo(e.target.value)}}
                    required
                />
            </div>

            <div className='inputBox descricao'>
                <label>Descrição do evento:</label>
                <textarea 
                    type='text'
                    value={descricao}
                    onChange={(e)=>{setDescricao(e.target.value)}}
                    placeholder='Description' 
                    required
                />
            </div>

            <div className='inputBox data'>
                <label>Data do evento:</label>
                <input 
                    type='date' 
                    value={data}
                    onChange={(e)=>{setData(e.target.value)}}
                    required
                />
            </div>

            <div className='inputBox hora'>
                <label>Hora do evento:</label>
                <input 
                    type='time'
                    value={hora}
                    onChange={(e)=>{setHora(e.target.value)}}
                    placeholder='00:00' 
                    required
                />
            </div>

            <div className='inputBox categoria'>
                <label>Categoria</label>
                <select 
                    name="categoria" 
                    value={catId}
                    onChange={(e)=>{setCadId(e.target.value)}}
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
                    onChange={(e)=>{setPreco(e.target.value)}}
                    placeholder='0,00' 
                    required
                />
            </div>

            <div className='inputBox loc'>
                <label>Local do evento:</label>
                <input 
                    type='text'
                    value={local}
                    onChange={(e)=>{setLocal(e.target.value)}}
                    placeholder='Location' 
                    required
                />
            </div>

            <button className='bttn' onClick={handleSubmit}>{loading}</button>

            {modal && (
            <Modal 
                className={`sucess ${fadeModal}`} 
                message="Evento atualizado com sucesso!" />
            )}
        </BoxPage>
    );
}