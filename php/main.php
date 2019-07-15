<?php

//phpinfo();
// Dependencies
require("Login.php");
require("CreateUser.php");
require("EntryReturn.php");
require("SendEntry.php");

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];
// Get the request itself
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
$json = file_get_contents('php://input');
$obj = json_decode($json);

$from = $_SERVER['REMOTE_ADDR'];

// Pass along the request to its appropriate function, depending on type
switch ($method) {
  case 'PUT':

      break;
  case 'POST':
  // Parse the input; is the client creating a user account, posting a message, or logging in?
    // If a user is being created:
    if($obj->{"CreateUser"} !=null) {     
      CreateUser::createNewUser($obj->{"CreateUser"},$obj->{"CreatePassword"},$obj->{"CreateEmail"});
    }
    // If an entry is being created:
    else if($obj->{"Content"} !=null) {
      SendEntry::sendJournalEntry($obj->{"Header"},$obj->{"Content"},$obj->{"UserID"});
    }
    break;
  case 'GET':
    if($obj->{"Username"} !=null) {
      $userID = Login::userLogin($obj->{"Username"},$obj->{"Password"});
      EntryReturn::getEntries($userID);
    }
    
    
    // Get messages corresponding to the user's id. User's username and password should be passed along to this.  
    break;
  default:
    echo "error";
    handle_error($request);  
    break;
}
?>
