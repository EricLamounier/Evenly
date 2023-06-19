import './Contact.css';

import logo from '../../../Images/logo/evenly_logo.png'
import Container from '../../Container/Container';

export default function Contact() {
    return (
        <Container className='contact'>
            <img className='logoContact' src={logo} alt="evenly logo" />
            <p>
                Fique à vontade para entrar em contato conosco se tiver alguma dúvida, sugestão ou interesse em nosso projeto. Estamos disponíveis para responder a perguntas e colaborar com outras pessoas. Você pode nos contatar através do seguinte endereço de e-mail: <a href="mailto:evenly@email.com" rel="noreferrer">evenly@email.com</a>. Além disso, você pode nos encontrar nas redes sociais:             
            </p>
            <p>
                Além disso, você também pode nos encontrar nas seguintes redes sociais:
            </p>
            <ul>
                <li>
                    <p>Email de suporte:  <a href='mailto:evenly@email.com' rel="noreferrer" target='_blank'>evenly@email.com</a></p>
                </li>
                <li>
                    <p>Eric's GitHub: &nbsp; <a href="https://github.com/EricLamounier" rel="noreferrer" target='_blank'>https://github.com/EricLamounier</a> </p>
                </li>
                <li>
                    <p>Eric's Instagram: &nbsp; <a href="https://instagram.com/eric.lamounier" rel="noreferrer" target='_blank'>https://instagram.com/eric.lamounier</a> </p> 
                </li>
                <li>
                    <p>Paulo's GitHub: &nbsp; <a href="https://github.com/PauloGomes01" rel="noreferrer" target='_blank'>https://github.com/PauloGomes01</a> </p>
                </li>
                <li>
                    <p>Paulo' Instagram: &nbsp; <a href="https://instagram.com/paulopimenta073" rel="noreferrer" target='_blank'>https://instagram.com/paulopimenta073</a> </p>
                </li>
            </ul>    
            <p>
                Ficaremos felizes em receber suas mensagens e responderemos o mais breve possível. Estamos abertos a novas parcerias e oportunidades de colaboração. Não hesite em nos contatar!
            </p>            
        </Container>
    )
}