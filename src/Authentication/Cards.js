export function Cards(user_id, opt, sucessCallback) {
    
    const url = "https://backend-sin143.000webhostapp.com/Server/Card.php/";

    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("opt", opt);

    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data =>{
        sucessCallback(data);
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
    
}