<?php

class CreateNewUser {
    private $databaseini;
    
    // Generate a cryptographically secure user ID
    private static function generateUserID($db_con) {

        // Define fields
        $UserIDField = 'UserID';
        $tableName = 'UserTable';
        $userIDExists = true;

        // While the generated User ID already exists in the database, continue generating it
        // (unlikely, but still a potential error)
        while($userIDExists) {
            $id = bin2hex(random_bytes(16));
            $userIDExists = CreateNewUser::checkIfExists($id,$db_con,$tableName,$UserIDField);
        }
        // Return an unused user ID
        return $id;
    }

    // Create a new user in the database
    public static function createUser($username,$password,$email) {

  
        
        // Get database credentials from hidden file
        $databaseini = parse_ini_file('angapp.ini');

        // Connect to the database
        $db_connection = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);

        // Clean user input
        $username = mysqli_real_escape_string($db_connection,$username);
        $password = mysqli_real_escape_string($db_connection,$password);

        $encrypted_password = CreateNewUser::generateHash($password);

        // Handle connection errors
        if ($db_connection->connect_error) {
            
            $failMessage = ("Connection failed: " . $db_connection->connect_error);
            $failMessageArray = array('status' =>$failMessage);
            $failMessageJSON =  json_encode($failMessageArray);
            die($failMessageJSON);
        }
        
        // Check if the username already exists
        if(CreateNewUser::checkIfExists($username,$db_connection,'UserTable','Username')) {
                        
            $failMessage = ("Username already exists.");
            $failMessageArray = array('status' =>$failMessage);
            $failMessageJSON =  json_encode($failMessageArray);
            die($failMessageJSON);
        }

        // Generate UserID
        $UserID = CreateNewUser::generateUserID($db_connection);

        // Define the query, adding a new user 
        $sql = "INSERT INTO UserTable (Username,Password, Email,UserID) VALUES ('$username','$encrypted_password','$email','$UserID');";

        // Define the status; did anything fail?
        $status = '';

        // Run the query and echo the response (success or fail)
        if ($db_connection->query($sql) === TRUE) {
            $status = "User created successfully!";
        } else {
            $status =  "Error: " . $sql . "<br>" . $db_connection->error;
        }
        
        // Convert the status to a JSON, and echo it
        $returnArray = array('status'=> $status, 'UserID' => $UserID);
        $returnJSON = json_encode($returnArray);

        echo $returnJSON;

    }

    // Check if a given field under a given column already exists (e.g: check if username already exists)
    public static function checkIfExists($wantedName,$db_connec,$tableName,$field) {

        // define query, selecting duplicate fields
        $sqlquery  = "SELECT $field FROM $tableName WHERE $field='$wantedName';";

        // Run query and save result
        $queryResult = mysqli_query($db_connec, $sqlquery);
        
        // If that field already exists, return true
        if(mysqli_num_rows($queryResult)>=1){
            return true;
        }else{
            return false;
        }
    }

    public static function generateHash($password) {
        // return password_hash($password,PASSWORD_BCRYPT);
        // return md5($password);
        return hash('sha512', $password);
    }



}

?>
