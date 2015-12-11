var PORT = 8080;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var csrf = require('csurf');
var mongoose = require('mongoose');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var uuid = require('uuid');
var io = require('socket.io')(http);
var async = require('async');
var co = require('co');
var fs = require('fs');
var util = require(__dirname + '/class/util.js');
var auth = require(__dirname + '/class/auth.js')
var config = require(__dirname + '/class/config.js');
var map = require(__dirname + '/class/map.js');

var test = require(__dirname + '/data/test.json');

var csrfProtection = csrf({cookie: true});

var md = require(__dirname + '/data/map.json');

mongoose.connect('mongodb://localhost/nodegame');

var UserSchema = mongoose.Schema({id: {type: Number}, username: {type: String}, password: {type: String}});
var TileSchema = mongoose.Schema({id: {type: Number}, owner: {type: String}, type: {type: Number}});

var users = mongoose.model('user', UserSchema);
var tiles = mongoose.model('tiles', TileSchema);

var map_data = md;

config.configure(__dirname, app, express, bodyParser, session, csrfProtection, cookieParser);

// All routes
app.get('/', function(req, res) {
	if (!util.isEmpty(req.session))
	{
		res.redirect('/home');
		return;
	}

	gsession = req.session;
	res.render("index", {error: -1, csrfToken: req.csrfToken()});
});

app.post('/', function(req, res) {
	auth.login(req, res, bcrypt, users);
});

app.get('/register', function(req, res) {
	if (!util.isEmpty(req.session))
	{
		res.redirect('/home');
		return;
	}

	res.render("register", {error: -1, csrfToken: req.csrfToken()});
});

app.post('/register', function(req, res) {
	auth.register(req, res, bcrypt, users, UserSchema);
});

app.get('/home', function(req, res) {
	if (util.isEmpty(req.session)) 
	{
		res.redirect('/');
		return;
	}

	res.render("home", {user_id: req.session.id, username: req.session.user});
});

app.get('/logout', function(req, res) {
	auth.logout(req, res);
	res.redirect('/');
});

app.get('/version', function(req,res) {
	res.render("patch_notes");
});

app.get('/tos', function(req,res) {
	res.render("tos");
});

io.on('connection', function(socket) {
	socket.emit('initial_data', map_data);
	socket.on('tile_united', function(data) {
		if (data.united_already) return
		// Write to JSON file here. :)
		md.tiles[data.id].owner = data.owner
		md.tiles[data.id].united = true
		fs.writeFile(__dirname + '/data/map.json', JSON.stringify(md, null, 4), function(err) {
			if (err) handleError(err);
		});
		// Resend map data (for united tile) here
		var tile={id:data.id,owner:data.owner,united:!0};
		io.emit('tile_state_changed', tile)
	});
});

http.listen(PORT, '0.0.0.0', function() {
	console.log("Listening on port *" + PORT);
	fs.writeFile(__dirname + '/data/test.json', JSON.stringify({name: 'garrett'}, test.array[0], 2), function (err) {
		if (err) handleError(err);
	});
});