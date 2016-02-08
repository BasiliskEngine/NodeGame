var util = require(__dirname + '/util.js');

var ab_count = false;

function login(req, res, bcrypt, users) {
	if (!req.body.username)
	{
		res.render('index', {error: "Please enter a username", csrfToken: req.csrfToken()});
		return;
	}

	if (!req.body.password)
	{
		res.render('index', {error: "Please enter a password", csrfToken: req.csrfToken()});
		return;	
	}
	var q = users.find({'username': req.body.username});
	q.select('id username password');
	q.exec(function (err, user) {
		if (err) return handleError(err);	
		if (user.length <= 0) {
			res.render('index', {error: "That user doesn't exist.", csrfToken: req.csrfToken()});
			return;
		}

		var comp = bcrypt.compareSync(req.body.password, user[0].password);
		if (comp == false)
		{
			res.render('index', {error: "That password doesn't match that user.", csrfToken: req.csrfToken()});	
			return;
		}

		req.session.user = user[0].username;
		req.session.id = user[0].id;

		res.redirect('/home');
	});
}

function register(req, res, bcrypt, users, UserSchema) {
	if (!req.body.username)
	{
		res.render('register', {error: "Please enter a username"});
		return;
	}

	if (!req.body.password)
	{
		res.render('register', {error: "Please enter a password"});
		return;	
	}

	if (!req.body.confirm_password)
	{
		res.render('register', {error: "Please confirm your password"});
		return;		
	}

	if (req.body.password != req.body.confirm_password)
	{
		res.render('register', {error: "Those passwords do not match"});
		return;			
	}

	var q = users.find({username: req.body.username});
	q.select('username');
	q.exec(function(err, user) {
		if (err) handleError(err);		
		if (user.length > 0) {	
			res.render('register', {error: "A user is already registered with that username."});
			return;
		}

		users.create({id: 0, username: req.body.username, password: bcrypt.hashSync(req.body.password)}, function(err) {
			if (err) handleError(err);
		});

		res.redirect('/');
	});
}

function validate_session(req) {
	if (util.isEmpty(req.session))
	{
		return true;
	}

	return false;
}

function logout(req, res)
{
	req.session.reset();
	res.clearCookie('session');
}

function resolve_error(i) {
	if (i == 1) {
		return "A user with that username already exists.";
	}

	return "";
}

module.exports = {
	login: login,
	register: register,
	validate_session: validate_session,
	logout: logout,
	resolve_error: resolve_error
};