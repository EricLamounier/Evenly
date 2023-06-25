export function Evento(id, titulo, descricao, categoria, data, hora, preco, local, opt, sucessCallback) {
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
    
    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data =>{
        sucessCallback(data[0].user_id);
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
}

export function enviarImagem(imagem, event_id, opt){
    const url = "https://backend-sin143.000webhostapp.com/Server/ImageEvent.php/";
    
    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("imagem", imagem);
    formData.append("event_id", event_id);

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        // fazer algo com a resposta
        //sucessCallback(true);
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
}

export function pegaEventos(user_id, opt, sucessCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Event.php/";
    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("user_id", user_id);

    formData.append("titulo", -1);
    formData.append("descricao", -1);
    formData.append("data", -1);
    formData.append("hora", -1);
    formData.append("preco", parseFloat(-1));
    formData.append("local", -1);
    formData.append("id", -1);
    formData.append("categoria", -1);

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

export function excluirEvento(evento_id, opt, sucessCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Event.php/";

    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("evento_id", evento_id);

    formData.append("titulo", -1);
    formData.append("descricao", -1);
    formData.append("data", -1);
    formData.append("hora", -1);
    formData.append("preco", parseFloat(-1));
    formData.append("local", -1);
    formData.append("id", -1);
    formData.append("categoria", -1);

    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        sucessCallback(true);
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
}

export function atualizarEvento(id, titulo, descricao, categoria, data, hora, preco, local, opt, sucessCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Event.php/";

    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("data", data);
    formData.append("hora", hora);
    formData.append("preco", parseFloat(preco));
    formData.append("local", local);
    formData.append("id", id);

    if(categoria == 0) //festa
        formData.append("categoria", 'Festa');
    else if(categoria == 1) //bar
        formData.append("categoria", 'Bar');
    else if(categoria == 2) //show
        formData.append("categoria", 'Show');
    else if(categoria == 3) //musica ao vivo
        formData.append("categoria", 'Musica ao Vivo');
    else if(categoria == 4) //teatro
        formData.append("categoria", 'Teatro');
    else if(categoria == 5) //curso
        formData.append("categoria", 'Curso');
    else if(categoria == 6) //feira
        formData.append("categoria", 'Feira');
    else
        formData.append("categoria", categoria);
    
    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data =>{
        sucessCallback(true);
    })
    .catch((error) => {
        console.error(error);
    // lidar com o erro
    });
}

export function retornaCategoria(cat){
    
    let aux = parseInt(cat);
    console.log(aux);

    if(isNaN(aux)){
        switch(cat){
            case 'Festa':
                return 0;
            case 'Bar':
                return 1;
            case 'Show':
                return 2;
            case 'Musica ao Vivo':
                return 3;
            case 'Teatro':
                return 4;
            case 'Curso':
                return 5;
            case 'Feira':
                return 6;
            default:
                break;
        }
    }else{
        return cat;
    }
}

export function curtir(opt, event_id, user_id, sucessCallback) {
    //type 0 - like type = 1 unlike
    const url = "https://backend-sin143.000webhostapp.com/Server/Review.php";
    
    let formData = new FormData();
    formData.append("opt", opt);
    formData.append("evento_id", event_id);
    formData.append("user_id", user_id);
    
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

export function comentar(opt, event_id, user_id, comentario, sucessCallback) {
    //type 0 - like type = 1 unlike
    const url = "https://backend-sin143.000webhostapp.com/Server/Review.php";
    
    let formData = new FormData();
    formData.append("opt", opt);
    formData.append("evento_id", event_id);
    formData.append("user_id", user_id);
    formData.append("comentario", comentario);
    
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