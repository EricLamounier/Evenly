export function User(uid, nome, email, tipoUsuario, opt, successCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Authentication.php/";
  
    let formData = new FormData();
    formData.append("opt", opt);
    formData.append("uid", uid);
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("tipoUsuario", tipoUsuario);
  
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Converter a resposta para JSON
        } else {
          throw new Error("Erro na solicitação"); // Tratar erros de resposta
        }
      })
      .then((data) => {
        // Fazer algo com os dados retornados
        successCallback(data);
      })
      .catch((error) => {
        console.error(error);
        // Lidar com erros de rede ou erros no servidor
      });
  }

  export function cadastrar(uid, nome, email, tipoUsuario, opt, successCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Authentication.php/";
  
    let formData = new FormData();
    formData.append("opt", 0);
    formData.append("uid", uid);
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("tipoUsuario", tipoUsuario);
  
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Converter a resposta para JSON
        } else {
          throw new Error("Erro na solicitação"); // Tratar erros de resposta
        }
      })
      .then((data) => {
        // Fazer algo com os dados retornados
        successCallback(data);
      })
      .catch((error) => {
        console.error(error);
        // Lidar com erros de rede ou erros no servidor
      });
  }

export function atualizar(uid, nome, email, tipoUsuario, opt, successCallback){
  const url = "https://backend-sin143.000webhostapp.com/Server/Authentication.php/";
  
  let formData = new FormData();
  formData.append("opt", opt);
  formData.append("uid", uid);
  formData.append("nome", nome);
  formData.append("email", email);
  formData.append("tipoUsuario", tipoUsuario);

  fetch(url, {
    method: "POST",
    body: formData
  })
  .then((response) => {
    if (response.ok) {
      return response.json(); // Converter a resposta para JSON
    } else {
      throw new Error("Erro na solicitação"); // Tratar erros de resposta
    }
  })
  .then((data) => {
    // Fazer algo com os dados retornados
    successCallback(data);
  })
  .catch((error) => {
    console.error(error);
    // Lidar com erros de rede ou erros no servidor
  });
}

export function pegaDadosUser(uid) {
    const url = `https://backend-sin143.000webhostapp.com/Server/Authentication.php`;

    let formData = new FormData();
    formData.append("uid", uid);
    formData.append("opt", 1);

    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        
        localStorage.setItem('uid', uid);
        return data;
    })
    .catch(error => {
        console.error(error);
    });
}
