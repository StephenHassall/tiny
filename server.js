/**
 * Simple server code to run web site in browser.
 * Point you browser to http://localhost:9092/index.html
 */
 'use strict';

 // Get express node module
 var express = require('express');
 
 // Create server
 var server = express();
 
 // Create and add the static public HTML middleware module
 server.use(express.static('./web/'));
 
 // Start server on port 9094
 server.listen(9094);
 