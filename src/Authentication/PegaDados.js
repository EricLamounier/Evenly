import { auth } from "../Firebase/Authentication";

export function pegaDados(uid) {
    const url = `https://backend-sin143.000webhostapp.com/Server/User.php`;
    
    
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
