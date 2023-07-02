<?php
header("Access-Control-Allow-Origin: *");
require_once('connection.php');

    $opt = $_POST['opt'];
    $user_id = $_POST['user_id'];

    if ($opt == 0) {
        $stmt = $conn->prepare("SELECT * FROM eventos LEFT JOIN eventos_imagens ON eventos.evento_id = eventos_imagens.fk_evento_id WHERE eventos.fk_user_id = ?");
        $stmt->bind_param("i", $user_id);
    } else {
        $stmt = $conn->prepare("SELECT * FROM eventos LEFT JOIN eventos_imagens ON eventos.evento_id = eventos_imagens.fk_evento_id");
    }

    $stmt->execute();
    $res = $stmt->get_result();

    $data = array();

    while ($row = $res->fetch_assoc()) {
        $user_stmt = $conn->prepare("SELECT user_name FROM usuarios WHERE user_id = ?");
        $user_stmt->bind_param("i", $row['fk_user_id']);
        $user_stmt->execute();
        $user_res = $user_stmt->get_result();
        $user_row = $user_res->fetch_assoc();

        $card = array(
            'evento_id' => $row['evento_id'],
            'evento_titulo' => $row['evento_titulo'],
            'evento_categoria' => $row['evento_categoria'],
            'evento_data' => $row['evento_data'],
            'evento_descricao' => $row['evento_descricao'],
            'evento_hora' => $row['evento_hora'],
            'evento_preco' => $row['evento_preco'],
            'evento_local' => $row['evento_local'],
            'evento_curtidas' => $row['evento_curtidas'],
            'imagem_id' => $row['imagem_id'],
            'imagem_url' => $row['imagem_url'],
            'user_id' => $row['fk_user_id'],
            'user_name' => $user_row['user_name']
        );

        $data[] = $card;
    }

    echo json_encode($data);
?>
