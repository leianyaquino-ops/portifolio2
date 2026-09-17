const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'portifolio'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }

    console.log('Conectado ao banco de dados com sucesso!');
});

// ==========================
// ROTA DE CADASTRO
// ==========================
app.post('/api/cadastro', (req, res) => {

    const { login, senha, tipoUsuario } = req.body;

    // Verifica se os campos foram enviados
    if (!login || !senha || !tipoUsuario) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Preencha todos os campos!'
        });
    }

    // Verifica se o usuário já existe
    const verificar = 'SELECT * FROM usuarios WHERE login = ?';

    db.query(verificar, [login], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao verificar usuário'
            });
        }

        if (results.length > 0) {
            return res.status(409).json({
                sucesso: false,
                mensagem: 'Esse usuário já existe!'
            });
        }

        // Insere o novo usuário
        const sql = `
            INSERT INTO usuarios (login, senha, tipo)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [login, senha, tipoUsuario], (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro ao cadastrar usuário'
                });
            }

            res.json({
                sucesso: true,
                mensagem: 'Cadastro realizado com sucesso!'
            });
        });
    });
});

// ==========================
// ROTA DE LOGIN
// ==========================
app.post('/api/login', (req, res) => {

    const { login, senha } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE login = ? AND senha = ?
    `;

    db.query(sql, [login, senha], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro no servidor'
            });
        }

        if (results.length > 0) {

            res.json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso!'
            });

        } else {

            res.status(401).json({
                sucesso: false,
                mensagem: 'Usuário ou senha incorretos!'
            });
        }
    });
});

// Inicia o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
