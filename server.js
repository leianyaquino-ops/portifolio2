const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

const app = express();
const porta = 3000;
 
const origensPermitidas = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:5501',
    'http://127.0.0.1:5501'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (origensPermitidas.includes(origin)) return callback(null, true);
        return callback(new Error('Origem não autorizada pelo CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
    secret: process.env.SESSION_SECRET || 'segredo-local-portfolio-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'portifolio'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
        return;
    }
    console.log('Conectado ao MySQL com sucesso!');
});


app.get('/', (req, res) => {
    res.send('Servidor do portfólio funcionando!');
});


app.post('/api/cadastro', (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'Preencha todos os campos!' });
    }

    const verificar = 'SELECT id FROM usuarios WHERE login = ?';

    db.query(verificar, [login], (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            return res.status(500).json({ sucesso: false, mensagem: 'Erro ao verificar usuário.' });
        }

        if (results.length > 0) {
            return res.status(409).json({ sucesso: false, mensagem: 'Esse usuário já existe!' });
        }

        const sql = 'INSERT INTO usuarios (login, senha) VALUES (?, ?)';

        db.query(sql, [login, senha], (err) => {
            if (err) {
                console.error('Erro ao cadastrar:', err);
                return res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar usuário.' });
            }

            return res.status(201).json({ sucesso: true, mensagem: 'Cadastro realizado com sucesso!' });
        });
    });
});

