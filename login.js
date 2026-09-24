const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLIC_AQUI'; // Insira aqui a sua chave anon public do Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.querySelector('form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento automático da página

    const emailInput = loginForm.querySelector('input[type="email"]') || document.getElementById('email');
    const passwordInput = loginForm.querySelector('input[type="password"]') || document.getElementById('password');

    if (!emailInput || !passwordInput) {
      alert('Campos de e-mail ou palavra-passe não encontrados.');
      return;
    }

    const { data, error } = await _supabase.auth.signInWithPassword({
      email: emailInput.value.trim(),
      password: passwordInput.value,
    });

    if (error) {
      alert('Erro ao fazer login: ' + error.message);
    } else {
      alert('Login realizado com sucesso!');
      window.location.href = 'home.html';
    }
  });
}