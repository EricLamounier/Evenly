<?php

header("Access-Control-Allow-Origin: *");
require_once('connection.php');
        if (true) {
            
            $titulo = 'titulo';
            $descricao = 'descricao';
            $data = '0000-00-00';
            $hora = '00:00:00';
            $preco = 1.45;
            $local = 'local';
            $id = 1;

            $stmt = $conn->prepare("INSERT INTO eventos (evento_titulo, evento_descricao, evento_data, evento_hora, evento_preco, evento_local, fk_user_id) VALUES (?, ?, ?, ?, ?, ?,?)");
            $stmt->bind_param("ssssdsi", $titulo, $descricao, $data, $hora, $preco, $local, $id);
            
            $stmt->execute();
    
            $stmt->close();

           
        } else {
            http_response_code(400);
            echo "Erro: Informações ausentes ou inválidas.";
        }

?>