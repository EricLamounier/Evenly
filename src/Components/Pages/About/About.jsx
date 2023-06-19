import './About.css';

import logo from '../../../Images/logo/evenly_column.png';
import ericImg from '../../../Images/developers/ericPerfil.jpg'
import pauloImg from '../../../Images/developers/pauloPerfil.jpg'
import Container from '../../Container/Container';

export default function About() {
    return (
        <Container className='about'>
            <section className='aboutProject'>
                <h2>Lorem Ipsum</h2>
                <img src={logo} alt="teste" />
                <p className='aboutText'>
                    Somos um grupo de estudantes apaixonados por desenvolvimento de software e estamos empolgados em apresentar nosso projeto de um Sistema de Cadastro de Eventos proposto pelo professor Clausius Reis como projeto da discipina SIN143 - Laboratório de Programação 2023-1. Somos estudantes da Universidade Federal de Viçosa, cursando a faculdade de Sistemas de Informação. Nosso objetivo com este projeto é criar uma plataforma intuitiva e eficiente para facilitar o cadastro e gerenciamento de eventos. Estamos comprometidos em fornecer uma solução confiável e de qualidade, levando em consideração as necessidades dos organizadores de eventos. Sejam muito bem vindos à <i><b>Evenly</b></i>!
                </p>
            </section>

            <section className='aboutEric'>
                <img className='person' src={ericImg} alt="teste" />
                <div>
                    <h2>Eric Lamounier - <i>6963</i></h2>
                    <p className='aboutText'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus porta quam ac sagittis. Vestibulum dignissim posuere quam, ac luctus erat vulputate a. Nulla porttitor fermentum dolor eget convallis. Ut quis metus quis felis blandit bibendum. Nulla mollis, odio non aliquet efficitur, erat risus ultricies magna, ac cursus neque nisi ac ex. Cras ante neque, sodales rutrum pellentesque ac, dignissim vitae mauris. Vivamus lobortis metus vel rhoncus finibus. Etiam ac urna fermentum, faucibus eros at, feugiat sem. Duis sed lacus ac nulla volutpat hendrerit. Ut et elementum lectus, sed pellentesque nibh. Cras egestas dui enim, sit amet lacinia dui egestas eu. Aliquam odio ex, bibendum a lectus nec, scelerisque volutpat orci. Donec in elementum turpis. Donec sagittis enim porttitor luctus pretium. Sed ac rhoncus mi, sed congue purus.
                    </p>
                </div>
            </section>

            <section className='aboutPaulo'>
                <img  className='person' src={pauloImg} alt="teste" />
                <div>
                    <h2>Paulo Gomes - <i>3687</i></h2>
                    <p className='aboutText'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus porta quam ac sagittis. Vestibulum dignissim posuere quam, ac luctus erat vulputate a. Nulla porttitor fermentum dolor eget convallis. Ut quis metus quis felis blandit bibendum. Nulla mollis, odio non aliquet efficitur, erat risus ultricies magna, ac cursus neque nisi ac ex. Cras ante neque, sodales rutrum pellentesque ac, dignissim vitae mauris. Vivamus lobortis metus vel rhoncus finibus. Etiam ac urna fermentum, faucibus eros at, feugiat sem. Duis sed lacus ac nulla volutpat hendrerit. Ut et elementum lectus, sed pellentesque nibh. Cras egestas dui enim, sit amet lacinia dui egestas eu. Aliquam odio ex, bibendum a lectus nec, scelerisque volutpat orci. Donec in elementum turpis. Donec sagittis enim porttitor luctus pretium. Sed ac rhoncus mi, sed congue purus.
                    </p>
                </div>
            </section>
        </Container>
    )
}