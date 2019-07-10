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

    public static function login($username,$password) {
        
        $databaseini = parse_ini_file('angapp.ini');
        $db_connection = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);

        $username = mysqli_real_escape_string($db_connection,$username);
        $password = mysqli_real_escape_string($db_connection,$password);

        if($username !="" && $password !="") {
            
            $sql = "SELECT UserID FROM UserTable where Username = '$username' and Password = '$password'";
            $query_result = mysqli_query($db_connection,$sql);
            echo json_encode(($query_result->fetch_assoc()));
            
            //$row = mysqli_fetch_row($query_result);
            //echo $row;
            // $json = json_encode($row);
           // echo $json;
        }
        else {
            echo "Blank username or password field.";
        }

    }

    public function testDatabase() {
        $databaseini = parse_ini_file('angapp.ini');
        echo $databaseini['servername'];
        
        $conn = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        $sql = "INSERT INTO UserTable (Username,Password, Email) VALUES ('K','Jerome','someemail@exmaple.com');";
        if ($conn->multi_query($sql) === TRUE) {
            echo "New records created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        } 
             
    }
}
?>