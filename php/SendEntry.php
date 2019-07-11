<?php

class SendEntry {

    // send entry to database, return success or failure
    public static function sendJournalEntry($header,$content,$UserID) {
                
        // Get database credentials from hidden file
        $databaseini = parse_ini_file('angapp.ini');

        // Connect to the database  
        $db_connection = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);
        
        // Clean the user input
        $header = mysqli_real_escape_string($db_connection,$header);
        $content = mysqli_real_escape_string($db_connection,$content);
        $UserID = mysqli_real_escape_string($db_connection,$UserID);

        // Handle connection errors
        if ($db_connection->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Define the query, adding a new user 
        $sql = "INSERT INTO EntryTable (Header,Content, UserID) VALUES ('$header','$content','$UserID');";
        
        // Run the query and echo the response (success or fail)
        if ($db_connection->query($sql) === TRUE) {
            echo "Entry created successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    
}
?>