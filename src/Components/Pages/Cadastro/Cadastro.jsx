import { Link } from 'react-router-dom';
import { useState } from 'react';

import Container from '../../Container/Container';
import Modal from '../../Modal/Modal';
import Loading from '../../Loading/Loading';

import { signUp } from '../../../Firebase/Authentication';
import { validarCadastro } from '../../../Authentication/ValidarCadastro';
import './Cadastro.css';
import { inserirDadosNoBancoDeDados } from '../../../Authentication/InsereDados';

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState(0);
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    //validacao dos inputs
    const [nomeValido, setNomeValido] = useState(true);
    const [emailValido, setEmailValido] = useState(true);
    const [senhaValida, setSenhaValida] = useState(true);
    const [confirmarSenhaValida, setConfirmarSenhaValida] = useState(true);

    //cadastro error
    const [modal, setModal] = useState(false);
    const [fadeModal, setFadeModal] = useState('');

    const [loading, setLoading] = useState('Cadastrar');

    const handleTipoUsuarioChange = (e) => {
      setTipoUsuario(parseInt(e.target.value));
    };
     
    //cadastro com email e senha
    const handleSubmit = (event) => {
      event.preventDefault();

      const isValid = validarCadastro(
        nome,
        email,
        senha,
        confirmarSenha,
        setNomeValido,
        setEmailValido,
        setSenhaValida,
        setConfirmarSenhaValida
      );

      if (isValid) {

        setLoading(<Loading />);
        

        signUp(email, senha)
        .then((uid) => {
          inserirDadosNoBancoDeDados(uid, nome, email, tipoUsuario, 0, (response)=>{
            if(response){
              console.log('sucess');
              window.location.replace("/home");
            }
          })
        })
        .catch((error) => {
          setLoading('Cadastrar');
          cadastroError()
        });
      }
    };

    function cadastroError(){
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
        <h1>Cadastro</h1>
        <form className="authForm">
          <div className="inputBox">
            <input
              id="nome"
              className={`${!nomeValido ? 'invalido' : ''}`}
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
              required
            />
            <label htmlFor="nome">Nome *</label>
          </div>
  
          <div className="inputBox">
            <input
              id="email"
              className={`${!emailValido ? 'invalido' : ''}`}
              type="text"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label htmlFor="email">E-mail *</label>
          </div>
  
          <div className="inputBox userTypeCad">
            <p>Tipo de usuário</p>

            <div>
              <label htmlFor="par">Participante</label>
              <input
                id="par"
                type="radio"
                tile="Participante"
                value="0"
                checked={tipoUsuario === 0}
                onChange={handleTipoUsuarioChange}
                name="tipoUsuario"
              />
              <label htmlFor="par" className='radioInput'></label>
            </div>

            <div>
              <label htmlFor="org">Organizador</label>
              <input
                id="org"
                type="radio"
                name="tipoUsuario"
                value="1"
                title="Organizador"
                checked={tipoUsuario === 1}
                onChange={handleTipoUsuarioChange}
                required
              />
              <label htmlFor="org" className='radioInput'></label>
            </div>
  
            <div>
              <label htmlFor="adm">Administrador</label>
              <input
                id="adm"
                type="radio"
                title="Administrador"
                value="2"
                checked={tipoUsuario === 2}
                onChange={handleTipoUsuarioChange}
                name="tipoUsuario"
              />
              <label htmlFor="adm" className='radioInput'></label>
            </div>
          </div>
  
          <div className="inputBox">
            <input
              id="senha"
              className={`${!senhaValida ? 'invalido' : ''}`}
              type="password"
              name="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              required
            />
            <label htmlFor="senha">Senha *</label>
          </div>
  
          <div className="inputBox">
            <input
              id="confirmarSenha"
              className={`${!confirmarSenhaValida ? 'invalido' : ''}`}
              type="password"
              name="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => {
                setConfirmarSenha(e.target.value);
              }}
              required
            />
            <label htmlFor="confirmarSenha">Confirmar senha *</label>
          </div>
  
          <button 
            className="authButton" 
            type="button" 
            onClick={handleSubmit}>
            {loading}
          </button>

          <Link className="authLink" to="/">
            Já possui conta? Entre aqui!
          </Link>
        </form>
        {modal && (
            <Modal className={`error ${fadeModal}`} message="Email já cadastrado!" />
        )}
      </Container>
    );
  }