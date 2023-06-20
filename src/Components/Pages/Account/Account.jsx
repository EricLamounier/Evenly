import './Account.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getUid} from '../../../Firebase/Authentication';
import { pegaDados } from '../../../Authentication/PegaDados';

export default function Account() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [uid, setUid] = useState('');

    useEffect(()=>{
        
        const uid = getUid();
        pegaDados(uid)
        .then(data =>{
            
            setName(data[0].user_name);
            setEmail(data[0].user_email);
            setTipo(data[0].user_tipo);
            setUid(data[0].user_uid);
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

                    <Link to={`/editar_conta?email=${email}&nome=${name}&tipoUsuario=${tipo}&uid=${uid}`}>
                        <button>Editar conta</button>
                    </Link>

                </div>
                        
                <hr/>

                <div className='events'>
                    <h3>Seus eventos</h3>

                </div>
            </div>
        </BoxPage>
    );
}