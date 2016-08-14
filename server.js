'use strict';

var app = require('express')();
var bodyParser = require('body-parser');
var express = require('express');
var moment = require('moment');
var path = require('path');

var port = 8080;

app.listen(port, function(){

  console.log("timestamp Started");
});


app.use(bodyParser.json());

app.get('/', function(req, res){ 
  res.send('Put a natural or unix date in the url');
});


    app.get('/:query', function(req, res) {
        var date = req.params.query;
        var unix = null;
        var natural = null;
        
        // Check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        } 
        
        // Check for initial natural time
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = +natToUnix(date);
            natural = unixToNat(unix);
        }
        
        var dateObj = { "unix": unix, "natural": natural };
        res.send(dateObj);
        
    });
    
    function natToUnix(date) {
        // Convert from natural date to unix timestamp
        return moment(date, "MMMM D, YYYY").format("X");
    }
    
    function unixToNat(unix) {
        // Convert unix timestamp to natural date
        return moment.unix(unix).format("MMMM D, YYYY");
    }





