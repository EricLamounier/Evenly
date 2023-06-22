import './Home.css';
import { useEffect, useState } from 'react';
import BoxPage from '../../BoxPage/BoxPage';
import NewEventButton from '../../NewEventButton/NewEventButton'
import  {Cards}  from '../../../Authentication/Cards';
import CardEvent from '../../CardEvent/CardEvent';

export default function Home(){

  const [eventos, setEventos] = useState([]);

  useEffect(()=>{
    

        Cards(7, 1, response => {
            const eventosArray = Object.values(response);
            setEventos(eventosArray);
          });
          
          

}, [])

    return (
        <BoxPage>
          <div className='main'>
            Lista de eventos
            <div className='events'>
            {
                        eventos.map(evento => (
                            <CardEvent key={evento.evento_id} titulo={evento.evento_titulo} imagem={evento.imagem_url}/>
                        ))
                    }    
              </div>
            <NewEventButton/>
          </div>
        </BoxPage>
    )
}
