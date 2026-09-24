// Inicializa o cliente do Supabase
const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLIC_AQUI';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Faz o login direto no Supabase
    const { data, error } = await _supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Erro ao fazer login: ' + error.message);
    } else {
      alert('Login realizado com sucesso!');
      window.location.href = 'home.html';
    }
  });
}