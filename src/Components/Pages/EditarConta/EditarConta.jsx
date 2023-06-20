import './EditarConta.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { inserirDadosNoBancoDeDados } from '../../../Authentication/User';
import Loading from '../../Loading/Loading';
import { changeEmail } from '../../../Firebase/Authentication';
import { resetPassword } from '../../../Firebase/Authentication';

export default function EditarConta() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [tipoUsuario, setTipoUsuario] = useState('');
    const [name, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState('');
    const [loading, setLoading] = useState('');
    const [password, setPassword] = useState('')

 
    useEffect(()=>{
        setTipoUsuario(parseInt(searchParams.get('tipoUsuario')));
        setNome(searchParams.get('nome'));
        setEmail(searchParams.get('email'));
        setUid(searchParams.get('uid'));
        setLoading('Atualizar registro');
        setPassword('')

    }, [])
    const handleTipoUsuarioChange = (e) => {
        setTipoUsuario(parseInt(e.target.value));
    };

    const handleSubmit = () => {
        setLoading(<Loading/>)
        changeEmail(email);

        inserirDadosNoBancoDeDados(uid, name, email, tipoUsuario, 2, (response)=>{
            if(response){
                setLoading('Atualizar registro');
                alert('Atualizado com sucesso');
            }
        })
        
      };

    const recuperarSenha = () => {
        resetPassword(email);
    }

    return (
        <BoxPage>
            <div className='inputBox'>
                <label>Nome:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e)=>{setNome(e.target.value)}}
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}    
                />

                </div>
            <div className="inputBox userTypeCad">
                <p>Tipo de usuário</p>

                <div>
                    <label htmlFor="par">Participante</label>
                    <input
                        id="par"
                        type="radio"
                        tile="Participante"
                        value="0"
                        checked={tipoUsuario === 0}
                        onChange={handleTipoUsuarioChange}
                        name="tipoUsuario"
                    />
                    <label htmlFor="par" className='radioInput'></label>
                </div>

                <div>
                    <label htmlFor="org">Organizador</label>
                    <input
                        id="org"
                        type="radio"
                        name="tipoUsuario"
                        value="1"
                        title="Organizador"
                        checked={tipoUsuario === 1}
                        onChange={handleTipoUsuarioChange}
                        required
                    />
                    <label htmlFor="org" className='radioInput'></label>
                </div>
    
                <div>
                    <label htmlFor="adm">Administrador</label>
                    <input
                        id="adm"
                        type="radio"
                        title="Administrador"
                        value="2"
                        checked={tipoUsuario === 2}
                        onChange={handleTipoUsuarioChange}
                        name="tipoUsuario"
                    />
                    <label htmlFor="adm" className='radioInput'></label>
                </div>
            </div>
            <button className='updateBttn' onClick={()=>{handleSubmit()}}>{loading}</button>

            <label>Recuperar senha: </label>
            <input
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <button onClick={()=>{recuperarSenha()}}>Recuperar senha</button>
        </BoxPage>
    );
}