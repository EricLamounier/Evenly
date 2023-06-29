/*
export function Evento(id, titulo, descricao, categoria, data, hora, preco, local, opt, sucessCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Event.php/";

    hora = `${hora}:00`;
    preco = preco.replace(',', '.');

    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("data", data);
    formData.append("hora", hora);
    formData.append("preco", parseFloat(preco));
    formData.append("local", local);
    formData.append("id", id);

    const categorias = [
        'Festa',
        'Bar',
        'Show',
        'Musica ao Vivo',
        'Teatro',
        'Curso',
        'Feira'
    ];
    formData.append("categoria", categorias[categoria]);

    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        sucessCallback(data[0].user_id);
    })
    .catch((error) => {
        console.error(error);
        // lidar com o erro
    });
}
*/

export function inserirEvento(id, titulo, descricao, categoria, data, hora, preco, local, opt, sucessCallback) {
    const url = "https://backend-sin143.000webhostapp.com/Server/Event.php/";

    hora = `${hora}:00`;
    preco = preco.replace(',', '.');

    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("data", data);
    formData.append("hora", hora);
    formData.append("preco", parseFloat(preco));
    formData.append("local", local);
    formData.append("id", id);

    const categorias = [
        'Festa',
        'Bar',
        'Show',
        'Musica ao Vivo',
        'Teatro',
        'Curso',
        'Feira'
    ];
    formData.append("categoria", categorias[categoria]);

    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        sucessCallback(data[0].user_id);
    })
    .catch((error) => {
        console.error(error);
        // lidar com o erro
    });
}

export function enviarImagem(imagem, event_id, opt) {
    const url = "https://backend-sin143.000webhostapp.com/Server/ImageEvent.php/";

    let formData = new FormData();
    formData.append("opt", parseInt(opt));
    formData.append("imagem", imagem);
    formData.append("event_id", event_id);

    return fetch(url, {
        method: "POST",
        body: formData
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
    .then(data => {
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

    formData.append("preco", parseFloat(-1));

    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
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
    formData.append("evento_id", id);

    const categorias = [
        'Festa',
        'Bar',
        'Show',
        'Musica ao Vivo',
        'Teatro',
        'Curso',
        'Feira'
    ];
    formData.append("categoria", categorias[categoria]);

    return fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        sucessCallback(true);
    })
    .catch((error) => {
        console.error(error);
        // lidar com o erro
    });
}

export function retornaCategoria(cat) {
    let aux = parseInt(cat);

    if (isNaN(aux)) {
        switch (cat) {
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
    } else {
        return cat;
    }
}

export function curtir(opt, event_id, user_id, sucessCallback) {
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
    .then(data => {
        sucessCallback(data);
    })
    .catch((error) => {
        console.error(error);
        // lidar com o erro
    });

}

export function comentar(opt, event_id, user_id, comentario, sucessCallback) {
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
    .then(data => {
        sucessCallback(data);
    })
    .catch((error) => {
        console.error(error);
        // lidar com o erro
    });

}
