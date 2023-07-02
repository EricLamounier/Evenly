<?php
header("Access-Control-Allow-Origin: *");

    class Review {
        private $evento_id;
        private $user_id;
        private $evento_curtidas_id;
        private $curtidas;
        private $conn;
        private $comentario;
        
        public function __construct() {
            require_once('connection.php');
            
            $this->conn = $conn;
        }
        
        public function setEventoId($evento_id) {
            $this->evento_id = $evento_id;
        }

        public function getEventoId() {
            return $this->evento_id;
        }

        public function setUserId($user_id) {
            $this->user_id = $user_id;
        }

        public function getUserId() {
            return $this->user_id;
        }
        
        public function setComentario($comentario){
            $this->comentario = $comentario;
        }
        
        public function like() {
           $stmt = $this->conn->prepare("SELECT COUNT(*) as count FROM eventos_curtidas WHERE fk_user_id = ? AND fk_evento_id = ?");
            $stmt->bind_param("ii", $user_id, $this->evento_id);
        
            $stmt->execute();
        
            $res = $stmt->get_result();
            $row = $res->fetch_assoc();
            $count = $row['count'];
        
            $stmt->close();
        
            if ($count == 0) {
                $stmt = $this->conn->prepare("INSERT INTO eventos_curtidas (fk_evento_id, fk_user_id) VALUES (?, ?)");
                $stmt->bind_param("ii", $this->evento_id, $this->user_id);
        
                $stmt->execute();
        
                $stmt->close();
        
                $data = array('response' => 1);
            } else {
                $data = array('response' => 0);
            }
            return $data;
        }

        public function unlike() {
            $stmt = $this->conn->prepare("DELETE FROM eventos_curtidas WHERE fk_user_id = ? AND fk_evento_id = ?");
            $stmt->bind_param("ii", $this->user_id, $this->evento_id);
        
            $stmt->execute();
            $stmt->close();
            
            $data = array('response' => 1);
    
            return $data;
            
        }
        
        public function getLikesComments() {
            
            //pega a quantidade de curtida do evento
            $stmt = $this->conn->prepare("SELECT COUNT(*) as count_like FROM eventos_curtidas WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
        
            $stmt->execute();
        
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
        
            $count_like = $row['count_like']; // Obtém o valor do "count"
        
            $stmt->close();
            
            //pega a quantidade de comentarios do evento
            $stmt = $this->conn->prepare("SELECT COUNT(*) as count_comment FROM eventos_comentarios WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
        
            $stmt->execute();
        
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
        
            $count_comment = $row['count_comment']; // Obtém o valor do "count"
        
            $stmt->close();
        
            $data = array('curtidas' => $count_like,
                          'comentarios' => $count_comment);
        
            return $data;
        }
        
        public function isLiked(){
            $stmt = $this->conn->prepare("SELECT COUNT(*) as count FROM eventos_curtidas WHERE fk_evento_id = ? AND fk_user_id = ? LIMIT 1");
            $stmt->bind_param("ii", $this->evento_id, $this->user_id);
        
            $stmt->execute();
        
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
        
            $count = $row['count']; // Obtém o valor do "count"
            
        
            $stmt->close();
        
            $data = array('isLiked' => $count);
        
            return $data;
        }
        
        public function comentar(){

            $stmt = $this->conn->prepare("INSERT INTO eventos_comentarios (fk_evento_id, fk_user_id, evento_comentario) VALUES (?, ?, ?)");
            $stmt->bind_param("iis", $this->evento_id, $this->user_id, $this->comentario);
    
            $stmt->execute();
    
            $stmt->close();
    
            $data = array('response' => 1);
    
            return $data;
          
        }
        
        public function getComentarios() {
            $stmt = $this->conn->prepare("SELECT evento_comentario, user_name FROM eventos_comentarios INNER JOIN usuarios ON fk_user_id = user_id
                                          WHERE fk_evento_id = ?");
            $stmt->bind_param("i", $this->evento_id);
        
            $stmt->execute();
        
            $res = $stmt->get_result();
        
            $data = array();
        
            while ($row = $res->fetch_assoc()) {
                $comentario = array(
                    'evento_comentario' => $row['evento_comentario'],
                    'user_name' => $row['user_name']
                );
                $data[] = $comentario;
            }
        
            $stmt->close();
        
            return $data;
        }
        
        public function sendInscription(){
            $stmt = $this->conn->prepare("SELECT registration_id FROM registrations WHERE fk_evento_id = ? AND fk_user_id = ?");
            $stmt->bind_param("ii", $this->evento_id, $this->user_id);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
              // O usuário já está inscrito neste evento, faça algo (por exemplo, retornar uma mensagem de erro)
              $data = array('response' => 0, 'message' => 'Você já está inscrito neste evento.');
            } else {
              $stmt = $this->conn->prepare("INSERT INTO registrations (fk_evento_id, fk_user_id) VALUES (?, ?)");
              $stmt->bind_param("ii", $this->evento_id, $this->user_id);
              $stmt->execute();
            
              $data = array('response' => 1);
            }
            
            return $data;

        }
        
        public function getInscription(){
            $stmt = $this->conn->prepare("SELECT COUNT(*) as count FROM registrations WHERE fk_evento_id = ? AND fk_user_id = ? LIMIT 1");
            $stmt->bind_param("ii", $this->evento_id, $this->user_id);
        
            $stmt->execute();
        
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
        
            $count = $row['count']; // Obtém o valor do "count"
            
        
            $stmt->close();
        
            $data = array('inscription' => $count);
        
            return $data;
        }
        
        function getParticipants(){
            $stmt = $this->conn->prepare("SELECT user_name FROM usuarios u INNER JOIN registrations r ON u.user_id = r.fk_user_id WHERE r.fk_evento_id = ? AND r.fk_user_id = ?");
                $stmt->bind_param("ii", $this->evento_id, $this->user_id);
                $stmt->execute();
                $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $users = array();
                while ($row = $result->fetch_assoc()) {
                    $users[] = $row;
                }
                return $users;
            } else {
                return array();
            }
        }
        
        public function endConnection() {
            $this->conn->close();
            $this->conn = null;
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
           
            $opt = $_POST['opt'];
            $user_id = $_POST['user_id'];
            $event_id = $_POST['evento_id'];

            $review = new Review();
            
            $review->setEventoId($event_id);
            $review->setUserId($user_id);
            
            switch ($opt) {
                case 0: //insert new like
                    $res = $review->like();
                    echo json_encode($res);
                    break;
                    
                case 1: //delete like
                    $res = $review->unlike();
                    echo json_encode($res);
                    break;
                    
                case 2: //get likes and comments from event
                    $res = $review->getLikesComments();
                    echo json_encode($res);
                    break;
                    
                case 3: //verify like
                    $res = $review->isLiked();
                    echo json_encode($res);
                    break;
                    
                case 4: //insert new comment
                    $review->setComentario($_POST['comentario']);
                    $res = $review->comentar();
                    echo json_encode($res);
                    break;
                    
                case 5: //pega o comentario
                    $res = $review->getComentarios();
                    echo json_encode($res);
                    break;
                    
                case 6:
                    $res = $review->sendInscription();
                    echo json_encode($res);
                    break;
                    
                case 7:
                    $res = $review->getInscription();
                    echo json_encode($res);
                    break;
                    
                case 8:
                    $res = $review->getParticipants();
                    echo json_encode($res);
                    break;
                    
                default:
                    echo json_encode('Erro: opt invalido');
                    break;
            }

            $review->endConnection();
    } else {
        http_response_code(405);
        echo "Erro: Método de solicitação inválido.";
    }

?>