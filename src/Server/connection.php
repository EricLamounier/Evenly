<?php
    $servername = "localhost";
    $username = "id20764602_root";
    $password = "EricPauloSin143@";
    $dbname = "id20764602_db";

    // Cria conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica se houve erro na conexão
    if ($conn->connect_error)
        die("Connection failed: " . $conn->connect_error);
?>