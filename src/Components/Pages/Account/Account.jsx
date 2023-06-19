import './Account.css';
import BoxPage from '../../BoxPage/BoxPage';
import Header from '../../Header/Header'
import { useEffect, useState } from 'react';
import getUid from '../../../Firebase/Authentication';
import { pegaDados } from '../../../Authentication/PegaDados';

export default function Account() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [photoUrl, setPhoto] = useState('https://backend-sin143.000webhostapp.com/perfilPhotos/default.svg');

    useEffect(()=>{
        
        const uid = getUid();
        pegaDados(uid)
        .then(data =>{
            
            setName(data[0].user_name);
            setEmail(data[0].user_email);
            setTipo(data[0].user_tipo);
        })

    }, [])

    return (
        <BoxPage>
            <Header el={1} photoPerfil={photoUrl}/>
            <p>Nome: {name}</p>
            <p>Email: {email}</p>
            <p>Tipo: 
                {
                    tipo === 0 ? 'Participante' : tipo === 1 ? 'Organizador' : tipo === 2 ? 'Administrador' : false
                }
            </p>
        </BoxPage>
    );
}