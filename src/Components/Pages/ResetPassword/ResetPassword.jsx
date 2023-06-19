import { Link } from 'react-router-dom'
import { useState } from 'react';

import { auth } from '../../../Firebase/Authentication'
import { sendPasswordResetEmail } from "firebase/auth";

import Container from '../../Container/Container';

import './ResetPassword.css'

export default function ResetPassword(){

    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            alert('email sent to ' + email)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log('error ' + errorCode + ': ' + errorMessage)
            // ..
        });
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
        </Container>
    )
}