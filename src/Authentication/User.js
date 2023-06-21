export function User(uid, nome, email, tipoUsuario, opt, sucessCallback) {
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
        // fazer algo com a resposta
        sucessCallback(true);
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
}

export function pegaDadosUser(uid) {
    const url = `https://backend-sin143.000webhostapp.com/Server/Authentication.php`;
    
    
    let formData = new FormData();
    formData.append("opt", 1);
    formData.append("uid", uid);
    formData.append("nome", -1);
    formData.append("email", -1);
    formData.append("tipoUsuario", -1);
    formData.append("perfilUrl", -1);

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
