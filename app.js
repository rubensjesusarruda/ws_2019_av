const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

require('./db');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

const PORTA = process.env.PORT || 3000;

app.use('/auth', require('./routes/autenticacao'));

app.listen(PORTA, () => console.log(`App executando na porta ${PORTA}`));

