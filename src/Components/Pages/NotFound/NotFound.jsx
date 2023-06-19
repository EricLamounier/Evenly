import './NotFound.css';
import { Link } from 'react-router-dom';
import Container from '../../Container/Container';

export default function NotFound() {
    return (
        <Container className='notFound'>
            <h1>Página não encontrada!</h1>
            <p>Parece que a página que você está procurando não foi encontrada. Isso pode ocorrer por várias razões, como o endereço digitado estar incorreto, a página ter sido removida ou renomeada, ou um erro de conexão. :)</p>
            <Link className='back' to={"/"} >Voltar à pagina de Login</Link>
        </Container>
    );
}