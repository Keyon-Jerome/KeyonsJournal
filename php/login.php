<?php

class Login {
    
    private $username = "";
    private $password = "";
    
    function __construct($username,$password) {
        $this->username = $username;
        $this->password = $password;
    }

    function sendAuthentication($username,$password) {
        // communicate with database
    }
}
?>