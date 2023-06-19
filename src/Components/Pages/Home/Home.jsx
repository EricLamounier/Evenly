import './Home.css';
import BoxPage from '../../BoxPage/BoxPage';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer'
export default function Home(){
    return (
        <BoxPage>
          <Header el={1} photoPerfil={-1}/>
          <div className='main'>
            Lista de eventos
          </div>
          <Footer/>
        </BoxPage>
    )
}
