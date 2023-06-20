import { Link } from 'react-router-dom'
import { useState } from 'react';

import { auth } from '../../../Firebase/Authentication'
import { resetPassword } from '../../../Firebase/Authentication';
import Container from '../../Container/Container';

import './ResetPassword.css'

export default function ResetPassword(){

    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        resetPassword(email);
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