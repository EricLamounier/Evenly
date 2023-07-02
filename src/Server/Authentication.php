<?php
header("Access-Control-Allow-Origin: *");
require_once('User.php');

class Authentication {
    public function __construct() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            $opt = $_POST['opt'];

            $user = new User();

            switch ($opt) {
                case 0:
                    $uid = $_POST['uid'];
                    $name = $_POST['nome'];
                    $email = $_POST['email'];
                    $userType = $_POST['tipoUsuario'];
                    
                    $user->setUid($uid);
                    $user->setNome($name);
                    $user->setEmail($email);
                    $user->setType($userType);
            
                    $newId = $user->insert();
                    echo json_encode($newId);
                    break;
                    
                case 1:
                    $uid = $_POST['uid'];
                    $user->setUid($uid);
                    $result = $user->select();
                    echo json_encode($result);
                    break;
                    
                case 2:
                    $uid = $_POST['uid'];
                    $name = $_POST['nome'];
                    $email = $_POST['email'];
                    $userType = $_POST['tipoUsuario'];
                    
                    $user->setUid($uid);
                    $user->setNome($name);
                    $user->setEmail($email);
                    $user->setType($userType);
                    
                    $result = $user->update();
                    echo json_encode($result);
                    break;
                    
                default:
                    break;
            }

            $user->endConnection();
        } else {
            http_response_code(401);
            echo "Erro: Informações ausentes ou inválidas.";
        }
    }
}

new Authentication();
?>