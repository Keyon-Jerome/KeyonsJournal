<?php
header('Access-Control-Allow-Origin: *');
class DeleteEntry {
    
    
    public static function delete($EntryID) {
        
        // Get database credentials from hidden file
        $databaseini = parse_ini_file('angapp.ini');

        // Connect to the database
        $db_connection = new mysqli($databaseini['servername'], $databaseini['db_username'],$databaseini['db_password'], $databaseini['db_name']);

        // Clean user input
        $EntryID = mysqli_real_escape_string($db_connection,$EntryID);
        
        // Define query; get all messages under given ID, and all of their information
        $sql = "DELETE FROM EntryTable WHERE EntryID='$EntryID'";
        
        // Run query and save result
        $query_result = mysqli_query($db_connection,$sql);
        
        // Run the query and echo the response (success or fail)
        if ($db_connection->query($sql) === TRUE) {
            $successMessage = "Entry deleted successfully!";
            $successMessageArray = array('status' =>$successMessage);
            $successMessageJSON =  json_encode($successMessageArray);
            echo $successMessageJSON;
        } else {

            $failMessage = "Error: " . $sql . "<br>" . $conn->error;
            $failMessageArray = array('status' =>$failMessage);
            $failMessageJSON =  json_encode($failMessageArray);
            die($failMessageJSON);
        }
        

    }


}
?>
