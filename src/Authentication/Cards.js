export function Cards(user_id, opt, successCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Card.php/";
  
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("opt", parseInt(opt));
  
    return fetch(url, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
    successCallback(data);
    })
    .catch(error => {
    console.error(error);
    // Tratar o erro aqui
    });
}  