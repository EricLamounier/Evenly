<?php

header("Access-Control-Allow-Origin: *");
    class Evento {
        private $user_id;
        private $evento_id;
        private $titulo;
        private $descricao;
        private $data;
        private $hora;
        private $local;
        private $preco;
        private $categoria;
        private $conn;

        public function __construct(){
            require_once('connection.php');

            $this->conn = $conn;
        }
        
        //sets
        public function setUserId($id){
            $this->user_id = $id;
        }
        
        public function setEventoId($evento_id){
            $this->evento_id = $evento_id;
        }

        public function setTitulo($titulo){
            $this->titulo = $titulo;
        }

        public function setDescricao($descricao){
            $this->descricao = $descricao;
        }

        public function setData($data){
            $this->data = $data;
        }

        public function setHora($hora){
            $this->hora = $hora;
        }

        public function setLocal($local){
            $this->local = $local;
        }

        public function setPreco($preco){
            $this->preco = $preco;
        }

        public function setCategoria($categoria){
            $this->categoria = $categoria;
        }

        //gets
        //...

        //methods
        public function insert() {
            $stmt = $this->conn->prepare("INSERT INTO eventos (evento_titulo, evento_descricao, evento_data, evento_hora, evento_preco, evento_local, evento_categoria, fk_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssdssi", $this->titulo, $this->descricao, $this->data, $this->hora, $this->preco, $this->local, $this->categoria, $this->user_id);
    
            $stmt->execute();
            
            $insertedId = $stmt->insert_id;
    
            $stmt->close();
            
            $newId = array('user_id' => $insertedId);
            $data[] = $newId;
            
            return $data; 
        }
        
        public function select() {
            $stmt = $this->conn->prepare("SELECT * FROM eventos WHERE fk_user_id = ?");
            $stmt->bind_param("i", $this->user_id);
    
            $stmt->execute();
    
            $res = $stmt->get_result();
    
            $data = array();
            
            while ($row = $res->fetch_assoc()) {
                $user = array(
                    'evento_id' => $row['evento_id'],
                    'evento_titulo' => $row['evento_titulo'],
                    'evento_descricao' => $row['evento_descricao'],
                    'evento_hora' => $row['evento_hora'],
                    'evento_preco' => $row['evento_preco'],
                    'evento_local' => $row['evento_local'],
                    'evento_categoria' => $row['evento_categoria'],
                    'evento_curtidas' => $row['evento_curtidas'],
                    'user_id' => $this->user_id
                );
                $data[] = $user;
            }
    
            $stmt->close();
            
            
            return $data; 
        }
        
        public function update() {
            $stmt = $this->conn->prepare("UPDATE eventos SET evento_titulo = ?, evento_descricao = ?, evento_data = ?, evento_hora = ?, evento_preco = ?, evento_local = ?, evento_categoria = ? WHERE evento_id = ?");
            $stmt->bind_param("ssssdssi", $this->titulo, $this->descricao, $this->data, $this->hora, $this->preco, $this->local, $this->categoria, $this->evento_id);
        
            $stmt->execute();
        
            $stmt->close();
        
            $newId = array('evento_id' => $this->evento_id);
            $data[] = $newId;
            
            return $data; 
        }
        
        public function delete() {
            
            $stmt = $this->conn->prepare("SELECT imagem_url FROM eventos_imagens WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
            $stmt->execute();
            $res = $stmt->get_result();
            $imagens = $res->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            
            // Excluir as imagens relacionadas ao evento
            foreach ($imagens as $imagem) {
                $imagemUrl = $imagem['imagem_url'];
                $diretorio = '../EventosImagens/';
                $filename = basename($imagemUrl);
                $path = $diretorio . $filename;
    
                if (file_exists($path)) {
                    unlink($path);
                }
            }
        
            // Excluir as imagens relacionadas ao evento
            $stmt = $this->conn->prepare("DELETE FROM eventos_imagens WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
            $stmt->execute();
            $stmt->close();
    
            // Excluir o evento
            $stmt = $this->conn->prepare("DELETE FROM eventos WHERE evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
            $stmt->execute();
            $stmt->close();
            
            //excluir curtidas relacionadas ao evento
            $stmt = $this->conn->prepare("DELETE FROM eventos_curtidas WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
            $stmt->execute();
            $stmt->close();
            
            //excluir comentarios relacionados ao evento
            $stmt = $this->conn->prepare("DELETE FROM eventos_comentarios WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
            $stmt->execute();
            $stmt->close();
            
            //excluir participantes relacionados ao evento
            $stmt = $this->conn->prepare("DELETE FROM registrations WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
            $stmt->execute();
            $stmt->close();
        }
        
        public function curtir(){
            $stmt = $this->conn->prepare("INSERT INTO eventos_curtidas (fk_evento_id, fk_user_id) VALUES (?, ?)");
            $stmt->bind_param("ii", $this->evento_id, $this->user_id);
    
            $stmt->execute();
        
            $stmt->close();
            
            $newId = array('sucess' => 'sucess');
            $data[] = $newId;
            
            return $data; 
        }
        

        public function endConnection() {
            $this->conn->close();
            $this->conn = null;
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            $opt = $_POST['opt'];

            $event = new Evento();

            switch ($opt) {
                case 0: //inserir um evento novo
                    $titulo = $_POST['titulo'];
                    $descricao = $_POST['descricao'];
                    $data = $_POST['data'];
                    $hora = $_POST['hora'];
                    $preco = $_POST['preco'];
                    $local = $_POST['local'];
                    $categoria = $_POST['categoria'];
                    $id = $_POST['id'];
                    
                    $data = implode('-', array_reverse(explode('/', $data)));
                    
                    $event->setTitulo($titulo);
                    $event->setDescricao($descricao);
                    $event->setData($data);
                    $event->setHora($hora);
                    $event->setPreco($preco);
                    $event->setLocal($local);
                    $event->setCategoria($categoria);
                    $event->setUserId($id);

                    $newId = $event->insert();
                    echo json_encode($newId);
                    break;
                    
                case 1: //select
                    $user_id = $_POST['user_id'];
                    $event->setUserId($user_id);
                    $data = $event->select();
                    echo json_encode($data);
                    break;
                    
                case 2: //deletar evento
                    $event_id = $_POST['evento_id'];
                    $event->setEventoId($event_id);
                    $event->delete();
                    $data = 'sucess';
                    echo json_encode($data);
                    break;
                    
                case 3: //atualizar evento
                    $event_id = $_POST['evento_id'];
                    $titulo = $_POST['titulo'];
                    $descricao = $_POST['descricao'];
                    $data = $_POST['data'];
                    $hora = $_POST['hora'];
                    $preco = $_POST['preco'];
                    $local = $_POST['local'];
                    $categoria = $_POST['categoria'];
                    
                    $data = implode('-', array_reverse(explode('/', $data)));
                    
                    $event->setTitulo($titulo);
                    $event->setDescricao($descricao);
                    $event->setData($data);
                    $event->setHora($hora);
                    $event->setPreco($preco);
                    $event->setLocal($local);
                    $event->setCategoria($categoria);
                    $event->setEventoId($event_id);
                    
                    $event->update();
                    $data = 'sucess';
                    echo json_encode($data);
                    break;
                    
                case 4:
                    $user_id = $_POST['user_id'];
                    $event->curtir($user_id);
                    $data = 'sucess';
                    echo json_encode($data);
                    break;
                    
                default:
                    $data = array('opt invalid' => $opt);
                    echo json_encode($data);
                    break;
            }

            $event->endConnection();
    } else {
        http_response_code(405);
        echo "Erro: Método de solicitação inválido.";
    }

?>