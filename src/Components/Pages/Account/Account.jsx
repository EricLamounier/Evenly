import './Account.css';
import BoxPage from '../../BoxPage/BoxPage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getUid} from '../../../Firebase/Authentication';
import { pegaDadosUser } from '../../../Authentication/User';
import NewEventButton from '../../NewEventButton/NewEventButton';
import { pegaEventos } from '../../../Authentication/Evento';
import CardEvent from '../../CardEvent/CardEvent';
import  {Cards}  from '../../../Authentication/Cards';

export default function Account() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [uid, setUid] = useState('');
    const [id, setId] = useState('');
    const [eventos, setEventos] = useState([]);

    useEffect(()=>{
        const uid = getUid();
        pegaDadosUser(uid)
        .then(data =>{
            
            setName(data[0].user_name);
            setEmail(data[0].user_email);
            setTipo(data[0].user_tipo);
            setUid(data[0].user_uid);
            setId(data[0].user_id);

            Cards(data[0].user_id, 0, response => {
                const eventosArray = Object.values(response);
                setEventos(eventosArray);
              });
              
              
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

                <h3>Seus eventos</h3>

                <div className='events'>
                    {
                        eventos.map(evento => (
                            <CardEvent key={evento.evento_id} titulo={evento.evento_titulo} imagem={evento.imagem_url}/>
                        ))
                    }   
                </div>
            </div>
        </BoxPage>
    );
}