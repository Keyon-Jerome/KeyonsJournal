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
            //$json =  rtrim($assoc_array, '[]');
            // $json = json_encode($assoc_array);

            #$userIDArray = array('UserID'=>$assoc_array['UserID']);
            $userIDJSON = json_encode($assoc_array);
            
            //$row = mysqli_fetch_row($query_result);
            //echo $row;
            //$json = json_encode($row);
           // $imploded= implode(' ',$assoc_array);
           // $exploded = explode( ' ', $imploded);

           // $returnArray = array('UserID' => $imploded);
            //$returnJSON = json_encode($returnArray,JSON_UNESCAPED_UNICODE);
           // $returnJSON = JSON.parse($returnJSON);
            //echo $json;
          //  $res = preg_replace("/[^a-zA-Z0-9]/", "", $returnJSON);
           // $res = rtrim($res,"[]");
            echo $userIDJSON;
            // echo "{'UserID':'aecb7458a675d1b1cb63ed8841abcf9e'}";
            // echo "hello\n";
        }
        else {
            $failMessage = "Blank username or password field" . " " . $username . " " . $password;
            $failMessageArray = array('status' =>$failMessage);
            $failMessageJSON =  json_encode($failMessageArray);
            die($failMessageJSON);
            
        }
        //echo $userIDJSON;
        //echo $assoc_array["UserID"];
        
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
