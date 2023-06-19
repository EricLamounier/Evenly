export function inserirDadosNoBancoDeDados(uid, nome, email, tipoUsuario) {
    const url = "https://backend-sin143.000webhostapp.com/Server/User.php/";

    let formData = new FormData();
    formData.append("opt", 0);
    formData.append("uid", uid);
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("tipoUsuario", tipoUsuario);
    formData.append("perfilUrl", -1);

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        // fazer algo com a resposta
        window.location.replace("/home");
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
}
