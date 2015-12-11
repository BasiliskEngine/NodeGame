function configure(dirname, app, express, bodyParser, session, csrf, cookieParser)
{
	app.set('view engine', 'ejs');
	app.set('views', dirname + '/static');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(express.static(dirname + '/static'));
	app.use(cookieParser());
	app.use(csrf);
	app.use(session({
		cookieName: 'session',
		genid: function(req) {
			return uuid.v1()
		},
		secret: '6d0828f5-b300-4113-aeb9-59bea23f2782',
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
		httpOnly: true,
	  	secure: true,
	  	ephemeral: true
	}));
}

module.exports = {
	configure: configure
};