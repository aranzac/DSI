module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.render('index');
	});
	app.get('/comedor', (req, res) => {
		res.render('comedor');
	});
	app.get('/contacto', (req, res) => {
		res.render('contacto');
	});
	app.get('/horarios', (req, res) => {
		res.render('horarios');
	});
	app.get('/preinscripcion', (req, res) => {
		res.render('preinscripcion');
	});
	app.get('/sobrenosotros', (req, res) => {
		res.render('sobrenosotros');
	});
	app.get('/login', (req, res) => {
		res.render('login');
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup');
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
