const SUPABASE_URL = "https://fnhuzusppzcolcnpabor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_PG9Dpirzhx35hvKTyMf9yw_WkzsKj7a";

async function cadastrar(event) {
    if (event) event.preventDefault();

    const login = document.getElementById('novoLogin').value.trim();
    const senha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não são iguais!');
        return false;
    }

    try {
        const resposta = await fetch(`${SUPABASE_URL}/rest/v1/usuarios`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                login: login,
                senha: senha,
                tipo_usuario: tipoUsuario
            })
        });

        if (!resposta.ok) {
            const erroDados = await resposta.json();
            if (erroDados.code === '23505') {
                alert('Este nome de usuário já está em uso!');
            } else {
                alert('Erro ao cadastrar: ' + (erroDados.message || resposta.statusText));
            }
            return false;
        }

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível conectar ao Supabase: ' + error.message);
    }
    return false;
}