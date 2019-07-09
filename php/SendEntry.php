<?php

class SendEntry {

    private $header = "";
    private $content = "";
    private $date;    
    
    function __construct($header,$content) {
        $this->header = $header;
        $this->content = $content;
        $this->date = date("Y/m/d");
    }

    function sendEntry($header,$content) {
        // send entry to database, return success or failure
    }
}
?>