<?php
class Login {
    
    private $databaseini;


    public static function userLogin($username,$password) {
        
        $databaseini = parse_ini_file('angapp.ini');
        $db_connection = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);

        $username = mysqli_real_escape_string($db_connection,$username);
        $password = mysqli_real_escape_string($db_connection,$password);

        $encrypted_password = CreateNewUser::generateHash($password);


        if($username !="" && $password !="") {

            $sql = "SELECT UserID FROM UserTable where Username = '$username' and `Password` = '$encrypted_password'";
            $query_result = mysqli_query($db_connection,$sql);
            $assoc_array = $query_result->fetch_assoc();
            $json = json_encode($assoc_array);
            
            //$row = mysqli_fetch_row($query_result);
            //echo $row;
            // $json = json_encode($row);
           // echo $json;
        }
        else {
            echo "Blank username or password field.";
        }
        //echo $assoc_array["UserID"];
        return $assoc_array["UserID"];
    }
/*
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
    */

}
?>
