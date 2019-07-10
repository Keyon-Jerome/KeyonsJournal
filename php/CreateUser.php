<?php

class CreateUser {
    private $databaseini;


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

        // Define the query, adding a new user 
        $sql = "INSERT INTO UserTable (Username,Password, Email) VALUES ('$username','$password','$email');";
        
        // Run the query and echo the response (success or fail)
        if ($db_connection->query($sql) === TRUE) {
            echo "User created successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $db_connection->error;
        }

    }
}

?>