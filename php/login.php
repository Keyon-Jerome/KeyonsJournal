<?php

class Login {
    
    private $username = "";
    private $password = "";
    private $databaseini;
    
    function __construct($username,$password) {
        $this->username = $username;
        $this->password = $password;
        $databaseini = parse_ini_file('angapp.ini');
    }

    function sendAuthentication($username,$password) {
        // communicate with database
    }
    function testDatabase() {
        $conn = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        $sql = "INSERT INTO UserTable (Username,Password, ID) VALUES ('Keyon','Jerome','12345');";
        if ($conn->multi_query($sql) === TRUE) {
            echo "New records created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }        
    }
}
?>