const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/passaporte';
mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('Mongoose conectado em ' + dbURI));
mongoose.connection.on('error', (erro) => console.log('Erro de conexão do Mongoose: ' + erro));
mongoose.connection.on('disconnected', () => console.log('Mongoose desconectado'));

var gracefullShutdown = (msg, callback) =>
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });

process.once('SIGUSR2', () =>
    gracefullShutdown('npm restart', () => process.kill(process.pid, 'SIGUSR2'))
);

process.on('SIGINT', () =>
    gracefullShutdown('app termination', () => process.exit(0))
);

process.on('SIGTERM', () =>
    gracefullShutdown('Heroku app shutdown', () => process.exit(0))
);