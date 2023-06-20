import './CriarEvento.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useState } from 'react';

export default function CriarEvento() {

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('00-00-0000');
    const [hora, setHora] = useState('00;00');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [images, setImages] = useState([]);

    const handleCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const imageList = [];
    
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            imageList.push(e.target.result);
            if (imageList.length === files.length) {
              setImages(imageList);
            }
          };
          reader.readAsDataURL(files[i]);
        }
    };

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
                <label>Imagens do evento:</label>
                <input 
                    type='file'
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
            </div>

            <button>Criar evento</button>
        </BoxPage>
    );
}