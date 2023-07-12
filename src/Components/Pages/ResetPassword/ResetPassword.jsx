import { Link } from 'react-router-dom'
import { useState } from 'react';

import { resetPassword } from '../../../Firebase/Authentication';
import Container from '../../Container/Container';
import Modal from '../../Modal/Modal';

import './ResetPassword.css'

export default function ResetPassword(){

    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(false);
    const [fadeModal, setFadeModal] = useState('');

    const handleSubmit = (event) => {
        resetPassword(email, response => {
            sucess()
        });
    }

    function sucess(){
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
        <Container className='auth'>
            <form className='authForm'>
                <h1>Recuperar senha</h1>
                <br/>
                <div className='inputBox'>
                    <input id="resetPwd" type="text" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="resetPwd">Email</label>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                >
                    Reset
                </button>
            </form>
            <br/><br/>
            <Link className="authLink" to="/">Voltar</Link>

            {modal && 
            (
            <Modal 
                className={`sucess ${fadeModal}`} 
                message='Email de verificação enviado!'
            />)}
        </Container>
    )
}