<?php

class CreateUser {
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
            $userIDExists = CreateUser::checkIfExists($id,$db_con,$tableName,$UserIDField);
        }
        // Return an unused user ID
        return $id;
    }

    // Create a new user in the database
    public static function createNewUser($username,$password,$email) {

  
        
        // Get database credentials from hidden file
        $databaseini = parse_ini_file('angapp.ini');

        // Connect to the database
        $db_connection = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);

        // Clean user input
        $username = mysqli_real_escape_string($db_connection,$username);
        $password = mysqli_real_escape_string($db_connection,$password);

        // Handle connection errors
        if ($db_connection->connect_error) {
            die("Connection failed: " . $db_connection->connect_error);
        }
        
        // Check if the username already exists
        if(CreateUser::checkIfExists($username,$db_connection,'UserTable','Username')) {
            die('Username already exists.');
        }

        // Generate UserID
        $UserID = CreateUser::generateUserID($db_connection);

        // Define the query, adding a new user 
        $sql = "INSERT INTO UserTable (Username,Password, Email,UserID) VALUES ('$username','$password','$email','$UserID');";
        
        // Run the query and echo the response (success or fail)
        if ($db_connection->query($sql) === TRUE) {
            echo "User created successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $db_connection->error;
        }

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
}

?>