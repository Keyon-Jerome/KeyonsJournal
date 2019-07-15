<?php

class EntryReturn {
    
    // Get all entries corresponding to the user ID
    public static function getEntries($UserID) {
        
        // Get database credentials from hidden file
        $databaseini = parse_ini_file('angapp.ini');

        // Connect to the database
        $db_connection = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);
        
        // Clean user input
        $UserID = mysqli_real_escape_string($db_connection,$UserID);
        
        // Define query; get all messages under given ID, and all of their information
        $sql = "SELECT * FROM EntryTable where UserID = '$UserID'";
        
        // Run query and save result
        $query_result = mysqli_query($db_connection,$sql);
        
        // Loop through query and convert it to JSON format.
        $rows = array();
        while($r = mysqli_fetch_assoc($query_result)) {
            $rows[] = $r;
        }
        
        echo json_encode($rows);

    }


}
?>
