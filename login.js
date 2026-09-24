// Inicialização do Supabase
const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLIC_AQUI'; // Subsitua pela sua chave anon public do Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert('Erro ao fazer login: ' + error.message);
      } else {
        alert('Login realizado com sucesso!');
        // Redireciona para a página do portfólio
        window.location.href = 'home.html'; 
      }
    } catch (err) {
      alert('Ocorreu um erro inesperado: ' + err.message);
    }
  });
}