import { Link } from 'react-router-dom';
import Container from '../../Container/Container';
import { useState } from 'react';

import './Login.css';

import { signIn } from '../../../Firebase/Authentication';
import { validarLogin } from '../../../Authentication/ValidarCadastro';
import Modal from '../../Modal/Modal';
import Loading from '../../Loading/Loading';

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //validar os inputs
    const [emailValido, setEmailValido] = useState(true);
    const [senhaValida, setSenhaValida] = useState(true);

    const [modal, setModal] = useState(false);
    const [fadeModal, setFadeModal] = useState('');

    const [loading, setLoading] = useState('Entrar');

    const handleSubmitEmailAndPassword = (event) => {
        event.preventDefault();
    
        const isValid = validarLogin(email, senha, setEmailValido, setSenhaValida);
    
        //entrar com email e senha
        if (isValid) {
            setLoading(<Loading />);
            signIn(email, senha, (success) => {
                if (success) {
                    window.location.replace('/home');
                } else {
                    loginError();
                    setLoading('Entrar')
                }
            });
        }
    }    

    function loginError(){
        setModal(true);
        setTimeout(() => {
            setFadeModal('hide')
            setTimeout(() => {
                setFadeModal('')
                setModal(false);
            }, 1000)

        }, 3000);
    }

    return (
        <Container className="auth">
            <h1 className='authTitle'>Login</h1>
            <form className="authForm">
            
                <div className="inputBox">
                    <input 
                        id="email"
                        className={`${!emailValido ? 'invalido' : ''}`}
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        required
                    />
                    <label htmlFor="email">E-mail *</label>
                </div>
                
                <div className="inputBox">
                    <input 
                        id="senha" 
                        className={`${!senhaValida ? 'invalido' : ''}`}
                        type="password" 
                        nome="senha" 
                        value={senha} 
                        onChange={(e)=>{setSenha(e.target.value)}} 
                        required
                        />
                    <label htmlFor="senha" >Senha *</label>
                </div>

                <button className="authButton" type="button" onClick={handleSubmitEmailAndPassword} > {loading} </button>

                <div className="authLinkContainer">
                    <Link className="authLink" to="/cadastro">Criar conta</Link>
                    <Link className="authLink" to="/resetPassword">Esqueceu sua senha?</Link>
                </div>
                <br/>
                {modal && (
                    <Modal className={`error ${fadeModal}`} message="Email ou senha incorretos!" />
                )}
            </form>
        </Container>
    )
}