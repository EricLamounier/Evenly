import './Home.css';
import BoxPage from '../../BoxPage/BoxPage';
import NewEventButton from '../../NewEventButton/NewEventButton'
export default function Home(){
    return (
        <BoxPage>
          <div className='main'>
            Lista de eventos
            <NewEventButton/>
          </div>
        </BoxPage>
    )
}
