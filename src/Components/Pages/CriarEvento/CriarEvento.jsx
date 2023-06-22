import './CriarEvento.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useState } from 'react';
import { Evento, enviarImagem } from '../../../Authentication/Evento';
import { pegaDadosUser } from '../../../Authentication/User';
import { getUid } from '../../../Firebase/Authentication';
export default function CriarEvento() {

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('00-00-0000');
    const [hora, setHora] = useState('00:00');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState(0);
    const [images, setImages] = useState([]);
    const [local, setLocal] = useState('');

    const handleCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const handleSubmit = () =>{
        const uid = getUid();
        pegaDadosUser(uid)
        .then(response => {
            Evento(response[0].user_id, titulo, descricao, categoria, data, hora, preco, local, 0,
                (el)=>{
                    handleImages(el);
                });
                alert('cadastrado com sucesso');
        })
    }

    const handleImages = (event_id) => {
        if(images.length > 0){
            Object.values(images).forEach((img) => {
                //envia cada imagem para o banco
                enviarImagem(img, event_id, 0);
            });
        }
    } 

    return (
        <BoxPage>
            <h2>Criar novo evento</h2>

            <div className='inputBox'>
                <label>Titulo do evento:</label>
                <input 
                    type='text' 
                    placeholder='Event' 
                    value={titulo}
                    onChange={(e)=>{setTitulo(e.target.value)}}
                    required
                />
            </div>

            <div className='inputBox'>
                <label>Descrição do evento:</label>
                <input 
                    type='text'
                    value={descricao}
                    onChange={(e)=>{setDescricao(e.target.value)}}
                    placeholder='Description' 
                    required
                />
            </div>

            <div className='inputBox'>
                <label>Data do evento:</label>
                <input 
                    type='date' 
                    onChange={(e)=>{setData(e.target.value)}}
                    required
                />
            </div>

            <div className='inputBox'>
                <label>Hora do evento:</label>
                <input 
                    type='time'
                    value={hora}
                    onChange={(e)=>{setHora(e.target.value)}}
                    placeholder='00:00' 
                    required
                />
            </div>

            <div className='inputBox'>
                <label>Categoria</label>
                <select 
                    name="categoria" 
                    value={categoria}
                    onChange={handleCategoria}
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

            <div className='inputBox'>
                <label>Preço do evento:</label>
                <input 
                    type='text'
                    value={preco}
                    onChange={(e)=>{setPreco(e.target.value)}}
                    placeholder='0,00' 
                    required
                />
            </div>

            <div className='inputBox'>
                <label>Local do evento:</label>
                <input 
                    type='text'
                    value={local}
                    onChange={(e)=>{setLocal(e.target.value)}}
                    placeholder='Location' 
                    required
                />
            </div>

            <div className='inputBox'>
                <label>Imagens do evento:</label>
                <input 
                    type='file'
                    multiple
                    accept="image/*"
                    onChange={(e)=>{setImages(e.target.files)}}
                    required
                />
            </div>
            <button onClick={handleSubmit}>Criar evento</button>
        </BoxPage>
    );
}