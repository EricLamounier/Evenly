export function Evento(id, titulo, descricao, categoria, data, hora, preco, local, opt) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Event.php/";

    hora += ':00';
    
    
    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("data", data);
    formData.append("hora", hora);
    formData.append("preco", parseFloat(preco));
    formData.append("local", local);
    formData.append("id", id);

    console.log(id)
    categoria = parseInt(categoria);
    if(categoria === 0) //festa
        formData.append("categoria", 'Festa');
    else if(categoria === 1) //bar
        formData.append("categoria", 'Bar');
    else if(categoria === 2) //show
        formData.append("categoria", 'Show');
    else if(categoria === 3) //musica ao vivo
        formData.append("categoria", 'Musica ao Vivo');
    else if(categoria === 4) //teatro
        formData.append("categoria", 'Teatro');
    else if(categoria === 5) //curso
        formData.append("categoria", 'Curso');
    else if(categoria === 6) //feira
        formData.append("categoria", 'Feira');
    
    fetch(url, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        // fazer algo com a resposta
        //sucessCallback(true);
        alert('evento cadastrado')
        console.log(response)
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
}