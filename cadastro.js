// =====================================================
// CONFIGURAÇÃO DO SUPABASE
// =====================================================
const SUPABASE_URL = "https://fnhuzusppzcolcnpabor.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaHV6dXNwcHpjb2xjbnBhYm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNzMyNzEsImV4cCI6MjEwNTg0OTI3MX0.vJVvyk2N2486O512Ly7b0JAMtu4XSnMqw2sFA3G7Guw";

// Inicializa a conexão com o Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cadastrar() {
    const email = document.getElementById("novoLogin").value;
    const senha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const tipoUsuario = document.getElementById("tipoUsuario").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        // Cadastra o usuário e salva o tipo de usuário nos dados do perfil
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: senha,
            options: {
                data: {
                    tipo_usuario: tipoUsuario
                }
            }
        });

        if (error) {
            alert("Erro ao cadastrar: " + error.message);
            return;
        }

        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        window.location.href = "index.html";

    } catch (erro) {
        console.error("Erro no cadastro:", erro);
        alert("Ocorreu um erro ao tentar cadastrar.");
    }
}