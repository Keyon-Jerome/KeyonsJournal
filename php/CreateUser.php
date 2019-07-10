<?php
    class CreateUser {
        private $databaseini;


        // Create a new user in the database
        public static function createNewUser($username,$password,$email) {
            // Get database credentials from hidden file
            $databaseini = parse_ini_file('angapp.ini');
            
            // Connect to database
            $conn = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);
            // Handle connection errors
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Define the query, adding a new user 
            $sql = "INSERT INTO UserTable (Username,Password, Email) VALUES ('$username','$password','$email');";
            
            // Run the query and echo the response (success or fail)
            if ($conn->query($sql) === TRUE) {
                echo "User created successfully!";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

        }
    }

?>