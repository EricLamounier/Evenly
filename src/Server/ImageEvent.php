<?php

header("Access-Control-Allow-Origin: *");
    class Imagem {
        private $id;
        private $nome;
        private $curtidas;
        private $conn;

        public function __construct($nome){
            require_once('connection.php');

            $this->conn = $conn;
            $this->nome = $nome;
        }

        public function insert($event_id) {
            $stmt = $this->conn->prepare("INSERT INTO eventos_imagens (imagem_url, fk_evento_id) VALUES (?, ?)");
            $stmt->bind_param("si", $this->nome, $event_id);
    
            $stmt->execute();
    
            $stmt->close();
        }

        public function endConnection() {
            $this->conn->close();
            $this->conn = null;
        }
    }

    if (true) {
            
            $img = $_FILES['imagem']['name'];

            $filename = md5(time()) . $img;

            $opt = $_POST['opt'];

            $imagem = new Imagem($filename);

            switch ($opt) {
                case 0:
                    $event_id = $_POST['event_id'];
                    $imagem->insert($event_id);
                    $diretorio = '../EventosImagens/';
                    move_uploaded_file($_FILES['imagem']['tmp_name'], $diretorio  . $filename);

                    break;
                    
                default:
                    break;
            }

            $imagem->endConnection();
    } else {
        http_response_code(405);
        echo "Erro: Método de solicitação inválido.";
    }

?>