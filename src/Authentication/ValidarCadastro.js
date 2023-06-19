export function validarCadastro(
    nome,
    email,
    senha,
    confirmarSenha,
    setNomeValido,
    setEmailValido,
    setSenhaValida,
    setConfirmarSenhaValida
  ) {
    let valid = true;
  
    // validar campo nome
    const nomeRegex = /^[A-Za-z\s]+$/;

if (!nome.trim() || !nomeRegex.test(nome)) {
  valid = false;
  setNomeValido(false);
} else {
  valid = true;
  setNomeValido(true);
}
  
    // validar campo email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      valid = false;
      setEmailValido(false);
    } else {
      setEmailValido(true);
    }
  
    // validar campo senha
    if (!senha || senha.length < 6) {
      valid = false;
      setSenhaValida(false);
    } else {
      setSenhaValida(true);
    }
  
    // validar campo confirmar senha
    if (confirmarSenha !== senha || confirmarSenha.length < 6) {
      valid = false;
      setConfirmarSenhaValida(false);
    } else {
      setConfirmarSenhaValida(true);
    }
  
    return valid;
  }
  
export function validarLogin(email, senha, setEmailValido, setSenhaValida){
    let valid = true;

    // validar campo email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      valid = false;
      setEmailValido(false);
    } else {
      setEmailValido(true);
    }

    // validar campo senha
    if (!senha || senha.length < 6) {
        valid = false;
        setSenhaValida(false);
    } else {
        setSenhaValida(true);
    }

    return valid;
}