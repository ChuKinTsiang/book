
/**
 * Module dependencies.
 */
var express = require('express')
    , cfg = require("./config")
    , routes = require('./routes')
    //, detail = require('./routes/detail')
    , http = require('http')
    , path = require('path');
var app = express();
app.configure(function(){
    app.set('port', process.env.PORT || cfg.ports.remote);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: "keyboard cat", maxAge: 12000}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
    app.use(express.errorHandler());
});
app.all('/', routes.index);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
