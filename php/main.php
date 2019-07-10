<?php
require("login.php");
// Get the request method
$method = $_SERVER['REQUEST_METHOD'];
// Get the request itself
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));


// Pass along the request to its appropriate function, depending on type
switch ($method) {
  case 'PUT':
  echo "hi";  
  // none for put
      $mylogin = new Login('asd','asdasd');
      $mylogin.testDatabase('asd','asdasd');
      break;
  case 'POST':
    // Parse the input; is the client creating a user account, posting a message, or logging in?
    
    break;
  case 'GET':
    echo "hi";
    // Get messages corresponding to the user's id. User's username and password should be passed along to this.  
    break;
  default:
  echo "hi";
    handle_error($request);  
    break;
}
?>