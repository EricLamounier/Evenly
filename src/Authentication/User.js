export function inserirDadosNoBancoDeDados(uid, nome, email, tipoUsuario, opt, sucessCallback) {
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
