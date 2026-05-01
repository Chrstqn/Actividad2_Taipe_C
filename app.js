const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const http = require('http'); 
const { Server } = require('socket.io'); 
require('dotenv').config();

const app = express(); 
const server = http.createServer(app);
const io = new Server(server);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(session({
    secret: 'mi_secreto_cookies',
    resave: false,
    saveUninitialized: false
}));

const esAutenticado = (req, res, next) => {
    if (req.session.usuarioId) {
        return next();
    }
    res.redirect('/login');
};

io.on('connection', (socket) => {
    console.log('📱 Un usuario se ha conectado al sistema');
    socket.on('disconnect', () => console.log('🚫 Usuario desconectado'));
});

app.set('socketio', io);

const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/', authRoutes);
app.use('/', esAutenticado, productoRoutes);

const URL_DB = process.env.URL_DB || "mongodb://127.0.0.1:27017/MiInventarioExpress";
mongoose.connect(URL_DB)
    .then(() => console.log('✅ Conectado exitosamente a MongoDB LOCAL'))
    .catch(err => console.error('❌ Error local:', err));

const PUERTO = process.env.PUERTO || 3000;
server.listen(PUERTO, () => {
    console.log(`🚀 Servidor con Socket.io en: http://localhost:${PUERTO}`);
});