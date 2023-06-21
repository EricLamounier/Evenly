import './Account.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getUid} from '../../../Firebase/Authentication';
import { pegaDadosUser } from '../../../Authentication/User';
import NewEventButton from '../../NewEventButton/NewEventButton';

export default function Account() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [uid, setUid] = useState('');
    const [id, setId] = useState('');

    useEffect(()=>{
        
        const uid = getUid();
        pegaDadosUser(uid)
        .then(data =>{
            
            setName(data[0].user_name);
            setEmail(data[0].user_email);
            setTipo(data[0].user_tipo);
            setUid(data[0].user_uid);
            setId(data[0].user_id);
        })

    }, [])

    return (
        <BoxPage>
            <div className='accountDetails'>
                <h2>Sua conta Evenly</h2>
                <div>
                    <p>Nome: {name}</p>
                    <p>Email: {email}</p>
                    <p>Tipo: &nbsp;
                        {
                            tipo === 0 ? 'Participante' : tipo === 1 ? 'Organizador' : tipo === 2 ? 'Administrador' : false
                        }
                    </p>

                    <Link to={`/editarConta?email=${email}&nome=${name}&tipoUsuario=${tipo}&id=${id}&uid=${uid}`}>
                        <button>Editar conta</button>
                    </Link>

                    <NewEventButton />

                </div>
                        
                <hr/>

                <div className='events'>
                    <h3>Seus eventos</h3>

                </div>
            </div>
        </BoxPage>
    );
}