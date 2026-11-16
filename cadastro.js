const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_PG9Dpirzhx35hvKTyMf9yw_WkzsKj7a"; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cadastrar(event) {
    if (event) event.preventDefault();

    const login = document.getElementById('novoLogin').value.trim();
    const senha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não são iguais!');
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('usuarios')
            .insert([
                { login: login, senha: senha, tipo_usuario: tipoUsuario }
            ]);

        if (error) {
            if (error.code === '23505') {
                alert('Este nome de usuário já está em uso!');
            } else {
                alert('Erro ao cadastrar: ' + error.message);
            }
            return;
        }

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível conectar ao Supabase.');
    }
}
