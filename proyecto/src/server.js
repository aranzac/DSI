const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const { url } = require('./config/database.js');

// Conectar a la bbdd
mongoose.connect(url, {
	useMongoClient: true
});

require('./config/passport')(passport);

//Puerto
app.set('port', process.env.PORT || 3000);
// Las vistas estaran en la carpeta views
app.set('views', path.join(__dirname, 'views'));
// El motor de plantillas es ejs
app.set('view engine', 'ejs');

// Middlewares
//Proporciona los get y post que vemos en la consola
app.use(morgan('dev'));

app.use(cookieParser());
// La info que reciba de los formularios la interpreta mediante la url
app.use(bodyParser.urlencoded({extended: false}));
//
app.use(session({
	secret: 'cadenasecreta',
	resave: false,
	saveUninitialized: false
}));

//Iniciar passport
app.use(passport.initialize());
// Para no estar pidiendo a la bbdd sino que se guarda en una sesion
app.use(passport.session());
// Mensaje para comunicarse entre htmls
app.use(flash());


// Rutas
require('./app/routes.js')(app, passport);

// Codigo fuente
app.use(express.static(path.join(__dirname, 'public')));

// ejecutar servidor
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});
