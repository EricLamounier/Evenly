import { auth } from "../Firebase/Authentication";

export function pegaDados(uid) {
    const url = `https://backend-sin143.000webhostapp.com/Server/getUserData.php`;
    
    
    let formData = new FormData();
    formData.append("uid", uid);

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
