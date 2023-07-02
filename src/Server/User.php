<?php
class User {
    private $uid;
    private $name;
    private $email;
    private $type;
    private $perfilUrl;
    private $conn;

    public function __construct() {
        require_once('connection.php');
        $this->conn = $conn;
    }
    
    //sets
    public function setUid($uid){
        $this->uid = $uid;
    }
    
    public function setNome($name){
        $this->name = $name;
    }
    
    public function setEmail($email){
        $this->email = $email;
    }
    
    public function setType($type){
        $this->type = $type;
    }
    
    public function setPerfilUrl($url){
        $this->perfilUrl = $url;
    }

    public function insert() {
        $stmt = $this->conn->prepare("INSERT INTO usuarios (user_uid, user_name, user_email, user_tipo) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $this->uid, $this->name, $this->email, $this->type);
    
        $stmt->execute();
    
        $insertedId = $stmt->insert_id; // Obtém o ID cadastrado
    
        $stmt->close();
    
        return $insertedId; // Retorna o ID cadastrado
    }


    public function select() {
        $stmt = $this->conn->prepare("SELECT * FROM usuarios WHERE user_uid = ? LIMIT 1");
        $stmt->bind_param("s", $this->uid);

        $stmt->execute();

        $res = $stmt->get_result();

        $data = array();

        while ($row = $res->fetch_assoc()) {
            $user = array(
                'user_id' => $row['user_id'],
                'user_uid' => $row['user_uid'],
                'user_name' => $row['user_name'],
                'user_email' => $row['user_email'],
                'user_tipo' => $row['user_tipo']
            );
            $data[] = $user;
        }

        $stmt->close();

        return $data;
    }

    public function update() {
        $stmt = $this->conn->prepare("UPDATE usuarios SET user_name = ?, user_email = ?, user_tipo = ? WHERE user_uid = ?");
        $stmt->bind_param("ssis", $this->name, $this->email, $this->type, $this->uid);

        $stmt->execute();

        $stmt->close();
        
        return $data = array('success' => 1);
    }

    public function endConnection() {
        $this->conn->close();
        $this->conn = null;
    }
}
?>