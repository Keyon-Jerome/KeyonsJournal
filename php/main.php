<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Request-Headers: X-Requested-With, Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, access-control-allow-origin, access-control-allow-headers, access-control-allow-methods, observe');
// header('Content-type: application/json');


//phpinfo();
// Dependencies
require("Login.php");
require("CreateNewUser.php");
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
    
    if(property_exists($obj,"CreateUsername")) {     
      CreateNewUser::createUser($obj->{"CreateUsername"},$obj->{"CreatePassword"},$obj->{"CreateEmail"});
    }
    // If an entry is being created:
    else if(property_exists($obj,"content")) {
      SendEntry::sendJournalEntry($obj->{"header"},$obj->{"content"},$obj->{"UserID"});
    }

    else if(property_exists($obj,"loginUsername")) {
      $userID = Login::userLogin($obj->{"loginUsername"},$obj->{"loginPassword"});
     // EntryReturn::getEntries($userID);
    }
    break;

  case 'GET':
    
    
    // Get messages corresponding to the user's id. User's username and password should be passed along to this.  
    break;
  default:
    echo "error";
    handle_error($request);  
    break;
}
?>
